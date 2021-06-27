import '../styles/questions.scss';
import { ReactNode} from 'react';
import cx from 'classnames';

type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    }
    children?: ReactNode;
    isAnswered?: boolean;
    isHilighted?: boolean;
}


export function Question({content, author, children, isAnswered = false, isHilighted = false}: QuestionProps) {
    return (
        <div className="question">
            <p>{content}</p>
            <footer>
                <div 
                    className={cx('question', 
                        {answered: isAnswered},
                        {highlighted: isHilighted && !isAnswered}
                        )}>
                    <img src={author.avatar} alt="" />
                    <span>{author.name}</span>
                </div>
                <div>
                    {children}
                </div>
            </footer>
        </div>
    )
}