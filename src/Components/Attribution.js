import React from 'react'
import s from "../Styles/components/attribution.module.scss"

function Attribution() {
    return(
        <footer id={s.attribution}>
            <div className={s.content}>
                <span>
                    Challenge by
                    <a 
                        href='https://www.frontendmentor.io?ref=challenge'
                        rel='noreferrer'
                        target="_blank"
                    >
                        Frontend Mentor
                    </a>
                </span>
                <span>
                    Coded by 
                    <a
                        href='https://github.com/bazinygero'
                    >
                        Ivan Zbyrnia
                    </a>
                </span>
            </div>
        </footer>
    )
}

export default Attribution