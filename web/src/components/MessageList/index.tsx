import { useEffect, useState } from 'react';
import styles from './styles.module.scss';

import logoImg from '../../assets/logo.svg'
import { api } from '../../services/api';
import { io } from 'socket.io-client';

type Message = {
    id: string;
    text: string;
    user: {
        avatar_url: string;
        name: string;
    }
}

const messagesQueue: Message[] = []

const socket = io(import.meta.env.VITE_SERVER_URL);

socket.on('new_message', (newMessage: Message) => {
    messagesQueue.push(newMessage);
});

export const MessageList = () => {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const timer = setInterval(() => {
            if (messagesQueue.length > 0) {
                setMessages(prevState => [messagesQueue[0], prevState[0], prevState[1]].filter(Boolean));

                messagesQueue.shift();
            }
        }, 3000);
    }, [])

    useEffect(() => {
        api.get<Message[]>('messages/last3').then(res => {
            setMessages(res.data);
        })
    }, []);

    return (
        <div className={styles.messageListWrapper}>
            <img src={logoImg} alt="DoWhile2021" />

            <ul className={styles.messageList}>
                {messages.map((message) => {
                    return (
                        <li key={message.id} className={styles.message}>
                            <p className={styles.messageContent}>{message.text}</p>
                            <div className={styles.messageUser}>
                                <div className={styles.userImage}>
                                    <img src={message.user.avatar_url} alt={message.user.name} />
                                </div>
                                <span>{message.user.name}</span>
                            </div>
                        </li>
                    )
                })}

            </ul>
        </div>
    )
}