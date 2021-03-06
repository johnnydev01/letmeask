
import { FormEvent, useState } from 'react';
import { useHistory, useParams} from 'react-router-dom';

import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';

import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { database } from '../services/firabse';

import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import { Question } from '../components/Question';

import '../styles/room.scss';
import deleteImg from '../assets/images/delete.svg';

type RoomParams= {
    id: string;
}





export function AdminRoom() {
    const history = useHistory();
    const params = useParams<RoomParams>();
    const roomId = params.id;

    const {title, questions} = useRoom(roomId);

    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')){
            const  questionRef = await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    async function handleEndRoom(){
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        });
        history.push('/')
    }
    async function handleCheckQuestionAnswered(questionId: string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true,
        });
    }
    async function handleHighlightQuestion(questionId: string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHilighted: true,
        });
    }
    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="" />
                    <div>
                        <RoomCode code={roomId}></RoomCode>
                        <Button 
                            isOutlined
                            onClick={handleEndRoom}
                        >Encerrar sala</Button>

                    </div>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    { questions.length > 0 && <span>{questions.length} perguntas</span>}
                </div>

               
                <div className="question-list">
                    {questions.map(question => {
                        return (
                            <Question 
                                key={question.id}
                                content={question.content}
                                author={question.author}
                                isAnswered={question.isAnswered}
                                isHilighted={question.isHighlighted}
                            >
                                {!question.isAnswered && (
                                    <>
                                    <button 
                                        type="button"
                                        onClick={() => handleCheckQuestionAnswered(question.id)}
                                    >
                                        <img src={checkImg} alt="Marcar pergunta como respondida" />
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => handleHighlightQuestion(question.id)}
                                    >
                                        <img src={answerImg} alt="Dar destaque á pergunta" />
                                    </button>
                                </>
                                )}
                                <button 
                                    type="button"
                                    onClick={() => handleDeleteQuestion(question.id)}
                                >
                                    <img src={deleteImg} alt="Remover pergunta" />
                                </button>
                            </Question>
                        )
                    })}

                </div>
            </main>
        </div>
    ) 
}