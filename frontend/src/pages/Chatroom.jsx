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
      const roomx = room.roomName;
      if (roomx.includes(user.username)) {
        const indexOfHifen = roomx.indexOf("_");
        setCustomRoomName(indexOfHifen !== -1 ? roomx.slice(0, indexOfHifen) : "Unknown");
      }
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
    setMsg((prev) => [...prev, newMessage]);
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
    <div className="flex flex-col h-full bg-transparent">
      <Helmet>
        <title>{customRoomName} | Joro Chat</title>
        <meta name="description" content={`Chatting with ${customRoomName} on Joro secure chatroom.`} />
      </Helmet>

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="w-8 h-8 border-3 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : showError ? (
        <div className="flex-1 flex items-center justify-center p-6 text-center">
          <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-3xl backdrop-blur-xl">
            <p className="text-red-400 font-semibold text-xs">{error || "Connection Interrupted"}</p>
          </div>
        </div>
      ) : (
        <>
          {/* Minimal Header */}
          <div className="px-6 py-4 bg-white/5 border-b border-white/5 backdrop-blur-xl flex justify-between items-center relative z-10">
            <div className="flex items-center gap-3">
              <div className="avatar-instagram">
                <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center font-bold text-white shadow-md text-sm">
                  {customRoomName[0].toUpperCase()}
                </div>
              </div>
              <div>
                <h2 className="font-bold text-white tracking-tight text-sm uppercase ">{customRoomName}</h2>
                <div className="flex items-center gap-1.5">
                  <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-[8px] font-bold text-white/40 tracking-wider uppercase">Active</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button title="Call" className="p-2.5 bg-white/5 rounded-xl border border-white/5 text-white/40 hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </button>
            </div>
          </div>

          {/* Optimized Message Area */}
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto px-6 py-6 space-y-6 custom-scrollbar">
            {MemoizedMessages}
            <div ref={messagesEndRef} />
          </div>

          {/* Minimal Input Area */}
          <div className="p-6 bg-black/5 backdrop-blur-2xl border-t border-white/5">
            <form onSubmit={handleSending} className="flex items-center gap-4">
              <input
                type="text"
                className="flex-1 bg-white/5 border border-white/5 rounded-2xl px-6 py-3.5 focus:outline-none focus:ring-1 focus:ring-blue-500/20 transition-all font-medium placeholder-white/20 text-xs"
                placeholder="Secure message..."
                value={currentMsg}
                onChange={(e) => setCurrentMsg(e.target.value)}
              />
              <button
                type="submit"
                disabled={!currentMsg.trim()}
                className="w-12 h-12 bg-blue-600 hover:bg-blue-500 disabled:bg-white/5 disabled:text-white/10 text-white rounded-xl shadow-lg flex items-center justify-center transition-all active:scale-95 group border border-white/10"
              >
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
