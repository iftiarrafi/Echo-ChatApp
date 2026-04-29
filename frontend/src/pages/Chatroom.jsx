import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getChatsRedux } from "../redux/getChatSlice";
import { io } from "socket.io-client";
import { Helmet } from "react-helmet-async";

const socket = io("http://localhost:3001", { autoConnect: false });

const Chatroom = ({ friendId }) => {
  const [Msg, setMsg] = useState([]);
  const [currentMsg, setCurrentMsg] = useState("");
  const [customRoomName, setCustomRoomName] = useState("Unknown");

  const dispatch = useDispatch();
  const { error, room, status, messages } = useSelector((state) => state.getroomStore);
  const { user } = useSelector((state) => state.login);

  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [Msg, scrollToBottom]);

  // Derived loading/error states for cleaner rendering
  const isLoading = status === "loading";
  const showError = status === "failed";

  useEffect(() => {
    if (user && room?.roomName) {
      const parts = room.roomName.split("_");
      const friendName = parts.find((name) => name !== user.username) || "Unknown";
      setCustomRoomName(friendName);
    }
  }, [room, user]);

  useEffect(() => {
    if (friendId && user) {
      dispatch(getChatsRedux({ friendId }));
    }
  }, [dispatch, friendId, user]);

  useEffect(() => {
    if (room?.roomName) {
      socket.connect();
      socket.emit("join-room", room.roomName);
      setMsg(messages || []);
    }
    return () => socket.disconnect();
  }, [room, messages]);

  useEffect(() => {
    const handleReceive = (msg) => setMsg((prev) => [...prev, msg]);
    socket.on("receive-message", handleReceive);
    return () => socket.off("receive-message");
  }, []);

  const handleSending = (e) => {
    if (e) e.preventDefault();
    if (!currentMsg.trim() || !room?.roomName || !user?._id) return;
    const newMessage = {
      room: room.roomName,
      senderId: user._id,
      senderName: user.username,
      content: currentMsg,
      timestamp: new Date().toISOString(),
    };
    socket.emit("sendMessage", newMessage);
    setCurrentMsg("");
  };

  const MemoizedMessages = useMemo(() => Msg.map((msg, index) => {
    const myMsg = msg.senderId === user?._id;
    return (
      <div key={index} className={`flex ${myMsg ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-1 duration-300`}>
        <div className={`max-w-[80%] md:max-w-[70%] space-y-1 ${myMsg ? "items-end text-right" : "items-start text-left"} flex flex-col`}>
          {!myMsg && <span className="text-[10px] font-semibold text-white/30 ml-2 uppercase tracking-wider">{msg.senderName}</span>}
          <div className={`px-4 py-2.5 rounded-2xl shadow-lg relative transition-all duration-300 ${myMsg
            ? "bg-blue-600/90 text-white rounded-tr-none ring-1 ring-white/5"
            : "bg-white/10 text-white/90 border border-white/5 rounded-tl-none hover:bg-white/15"
            }`}>
            <p className="text-xs font-medium leading-relaxed">{msg.content}</p>
          </div>
          <span className="text-[9px] font-medium text-white/20 uppercase tracking-tighter px-1">
            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    );
  }), [Msg, user]);

  return (
    <div className="flex flex-col h-full bg-black/20 backdrop-blur-3xl">
      <Helmet>
        <title>{customRoomName} • Echo</title>
      </Helmet>

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : showError ? (
        <div className="flex-1 flex items-center justify-center p-6 text-center">
          <div className="bg-red-500/5 border border-red-500/10 p-6 rounded-3xl">
            <p className="text-red-400 font-bold text-[10px] uppercase tracking-widest">{error || "Connection Interrupted"}</p>
          </div>
        </div>
      ) : (
        <>
          {/* Minimal Header */}
          <div className="px-8 py-4 border-b border-[#1a1a1a] flex justify-between items-center relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#111] border border-[#222] flex items-center justify-center font-bold text-white text-sm">
                {customRoomName[0].toUpperCase()}
              </div>
              <div>
                <h2 className="font-bold text-white tracking-tight text-sm uppercase">{customRoomName}</h2>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                  <span className="text-[9px] font-bold text-gray-500 tracking-wider uppercase">SECURE SESSION</span>
                </div>
              </div>
            </div>
          </div>

          {/* Optimized Message Area */}
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto px-8 py-8 space-y-6 custom-scrollbar">
            {MemoizedMessages}
            <div ref={messagesEndRef} />
          </div>

          {/* Minimal Input Area */}
          <div className="p-6 border-t border-[#1a1a1a]">
            <form onSubmit={handleSending} className="flex items-center gap-4 max-w-4xl mx-auto w-full">
              <input
                type="text"
                className="flex-1 bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl px-6 py-3.5 focus:outline-none focus:border-blue-500/50 transition-all font-medium placeholder-gray-600 text-[11px] text-gray-100"
                placeholder="TYPE A MESSAGE..."
                value={currentMsg}
                onChange={(e) => setCurrentMsg(e.target.value)}
              />
              <button
                type="submit"
                disabled={!currentMsg.trim()}
                className="w-12 h-12 bg-white text-black hover:bg-gray-200 disabled:bg-[#111] disabled:text-gray-700 rounded-xl shadow-xl flex items-center justify-center transition-all active:scale-95 group"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Chatroom;

