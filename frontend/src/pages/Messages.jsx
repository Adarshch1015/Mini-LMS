import { Search, Send, Image as ImageIcon, Paperclip } from 'lucide-react';

const Messages = () => {
    return (
        <div style={{display: 'flex', height: '100%', overflow: 'hidden'}}>
            {/* Sidebar for Messages */}
            <div style={{width: '320px', borderRight: '1px solid var(--border-light)', backgroundColor: 'var(--bg-white)', display: 'flex', flexDirection: 'column'}}>
                <div style={{padding: '1.5rem', borderBottom: '1px solid var(--border-light)'}}>
                    <h2 style={{fontSize: '1.25rem', marginBottom: '1rem'}}>Messages</h2>
                    <div className="search-bar" style={{width: '100%', background: 'var(--bg-main)'}}>
                        <Search size={16} color="var(--text-muted)" />
                        <input type="text" placeholder="Search chats..." style={{fontSize: '0.85rem'}} />
                    </div>
                </div>
                
                <div style={{flex: 1, overflowY: 'auto'}}>
                    {[
                        {name: 'Jessica Alba', msg: 'Sure! See you tomorrow.', time: '10:42 AM', unread: 2, online: true},
                        {name: 'Instructor James', msg: 'Your assignment is graded.', time: 'Yesterday', unread: 0, online: false},
                        {name: 'Course Group A', msg: 'David: Anyone have the notes?', time: 'Yesterday', unread: 5, online: true},
                    ].map((chat, i) => (
                        <div key={i} style={{padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '15px', borderBottom: '1px solid var(--border-light)', cursor: 'pointer', background: i === 0 ? 'var(--bg-content)' : 'var(--bg-white)'}}>
                            <div style={{position: 'relative'}}>
                                <img src={`https://i.pravatar.cc/150?img=${i+20}`} style={{width: '45px', height: '45px', borderRadius: '50%', objectFit: 'cover'}} alt=""/>
                                {chat.online && <div style={{position: 'absolute', bottom: 2, right: 0, width: '12px', height: '12px', background: 'var(--card-green)', borderRadius: '50%', border: '2px solid white'}}></div>}
                            </div>
                            <div style={{flex: 1, overflow: 'hidden'}}>
                                <div className="flex-between">
                                    <strong style={{fontSize: '0.9rem'}}>{chat.name}</strong>
                                    <span style={{fontSize: '0.75rem', color: 'var(--text-muted)'}}>{chat.time}</span>
                                </div>
                                <div className="flex-between" style={{marginTop: '0.3rem'}}>
                                    <span style={{fontSize: '0.85rem', color: chat.unread ? 'var(--text-dark)' : 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{chat.msg}</span>
                                    {chat.unread > 0 && <span style={{background: 'var(--card-purple)', color: 'white', fontSize: '0.7rem', padding: '2px 6px', borderRadius: '10px'}}>{chat.unread}</span>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Chat Area */}
            <div style={{flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-content)'}}>
                <div style={{height: '80px', padding: '0 2rem', background: 'var(--bg-white)', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                        <img src="https://i.pravatar.cc/150?img=20" style={{width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover'}} alt=""/>
                        <div>
                            <h3 style={{fontSize: '1rem', fontWeight: 600}}>Jessica Alba</h3>
                            <span style={{fontSize: '0.8rem', color: 'var(--card-green)'}}>Online</span>
                        </div>
                    </div>
                </div>

                <div style={{flex: 1, overflowY: 'auto', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
                    <div style={{alignSelf: 'center', background: 'var(--border-light)', padding: '0.3rem 1rem', borderRadius: '20px', fontSize: '0.75rem', color: 'var(--text-muted)'}}>Today</div>
                    
                    <div style={{display: 'flex', gap: '15px', maxWidth: '70%'}}>
                        <img src="https://i.pravatar.cc/150?img=20" style={{width: '35px', height: '35px', borderRadius: '50%', objectFit: 'cover'}} alt=""/>
                        <div>
                            <div style={{background: 'var(--bg-white)', padding: '1rem', borderRadius: '0 16px 16px 16px', boxShadow: 'var(--shadow-sm)'}}>
                                <p style={{fontSize: '0.9rem'}}>Hey! Are we still meeting for the study group later?</p>
                            </div>
                            <span style={{fontSize: '0.7rem', color: 'var(--text-muted)', marginLeft: '0.5rem', display: 'block', marginTop: '0.3rem'}}>10:40 AM</span>
                        </div>
                    </div>

                    <div style={{display: 'flex', gap: '15px', maxWidth: '70%', alignSelf: 'flex-end', flexDirection: 'row-reverse'}}>
                        <div style={{width: '35px', height: '35px', borderRadius: '50%', background: 'var(--card-purple)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 600}}>ME</div>
                        <div>
                            <div style={{background: 'var(--card-purple)', color: 'white', padding: '1rem', borderRadius: '16px 0 16px 16px', boxShadow: 'var(--shadow-sm)'}}>
                                <p style={{fontSize: '0.9rem'}}>Sure! See you tomorrow.</p>
                            </div>
                            <span style={{fontSize: '0.7rem', color: 'var(--text-muted)', marginRight: '0.5rem', display: 'block', marginTop: '0.3rem', textAlign: 'right'}}>10:42 AM</span>
                        </div>
                    </div>
                </div>

                <div style={{padding: '1.5rem 2rem', background: 'var(--bg-white)', borderTop: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '15px'}}>
                    <button className="btn" style={{padding: '0.5rem', background: 'var(--bg-main)', borderRadius: '50%'}}><Paperclip size={18} color="var(--text-muted)"/></button>
                    <button className="btn" style={{padding: '0.5rem', background: 'var(--bg-main)', borderRadius: '50%'}}><ImageIcon size={18} color="var(--text-muted)"/></button>
                    <div style={{flex: 1, background: 'var(--bg-main)', borderRadius: '99px', padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center'}}>
                        <input type="text" placeholder="Type your message..." style={{border: 'none', background: 'transparent', width: '100%', outline: 'none', fontSize: '0.95rem'}} />
                    </div>
                    <button className="btn btn-primary" style={{borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0}}><Send size={20}/></button>
                </div>
            </div>
        </div>
    );
};

export default Messages;
