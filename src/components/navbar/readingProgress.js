import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { brandColors } from "../../styles/brandColors"

const ReadingProgressDiv = styled.div`
    position: absolute;
    height: 5px;
    top: 55px;
    left: 0;
    z-index: 1;
    background-color: ${brandColors.green};
`

const ReadingProgress = ({ target }) => {
    const [readingProgress, setReadingProgress] = useState(0)
    const scrollListener = () => {
        if (!target.current) {
            return
        }

        const element = target.current
        const totalHeight =
            element.clientHeight - element.offsetTop - window.innerHeight
        const windowScrollTop =
            window.scrollY ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0

        if (windowScrollTop === 0) {
            return setReadingProgress(0)
        }

        if (windowScrollTop > totalHeight) {
            return setReadingProgress(100)
        }

        setReadingProgress((windowScrollTop / totalHeight) * 100)
    }

    useEffect(() => {
        window.addEventListener("scroll", scrollListener)
        return () => window.removeEventListener("scroll", scrollListener)
    })

    return <ReadingProgressDiv style={{ width: `${readingProgress}%` }} />
}

export default ReadingProgress
