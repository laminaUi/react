import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

interface CarouselProps {
  afterChange?: (currentSlide: number) => void
  autoplay?: boolean
  autoplaySpeed?: number
  children: React.ReactNode
}

const Container = styled.div`
  overflow: hidden;
  position: relative;
`

const Wrapper = styled.div`
  display: flex;
  transition: transform 0.5s ease;
  transform: translateX(0%);
`

const Slide = styled.div`
  flex: 0 0 100%;
`

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`

const Dot = styled.span<{ active: boolean }>`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? '#000' : '#bbb')};
  margin-right: 8px;
  cursor: pointer;
`

const PrevButton = styled.button`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  color: #fff;
  font-size: 24px;
  padding: 16px;
  cursor: pointer;
`

const NextButton = styled.button`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  color: #fff;
  font-size: 24px;
  padding: 16px;
  cursor: pointer;
`

const Carousel: React.FC<CarouselProps> = ({ afterChange, autoplay = false, autoplaySpeed = 3000, children }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [translateX, setTranslateX] = useState(0)
  const autoScrollInterval = useRef<NodeJS.Timeout | null>(null)

  const dots = Array.from({ length: React.Children.count(children) }, (_, i) => i)

  useEffect(() => {
    if (autoplay) {
      autoScrollInterval.current = setInterval(() => {
        const nextSlide = currentSlide + 1
        setCurrentSlide(nextSlide >= React.Children.count(children) ? 0 : nextSlide)
        setTranslateX(-100 * (nextSlide >= React.Children.count(children) ? 0 : nextSlide))
      }, autoplaySpeed)
    }
    return () => {
      if (autoScrollInterval.current) clearInterval(autoScrollInterval.current)
    }
  }, [autoplay, autoplaySpeed, children, currentSlide])

  useEffect(() => {
    setTranslateX(-100 * currentSlide)
    if (afterChange) afterChange(currentSlide)
  }, [currentSlide, afterChange])

  const handleDotClick = (dotIndex: number) => {
    setCurrentSlide(dotIndex)
  }

  const handlePrevClick = () => {
    const prevSlide = currentSlide - 1
    setCurrentSlide(prevSlide < 0 ? React.Children.count(children) - 1 : prevSlide)
  }

  const handleNextClick = () => {
    const nextSlide = currentSlide + 1
    setCurrentSlide(nextSlide >= React.Children.count(children) ? 0 : nextSlide)
  }

  return (
    <Container>
      <Wrapper style={{ transform: `translateX(${translateX}%)` }}>
        {React.Children.map(children, (child, index) => (
          <Slide key={index}>{child}</Slide>
        ))}
      </Wrapper>
      <PrevButton onClick={handlePrevClick}>{'<'}</PrevButton>
      <NextButton onClick={handleNextClick}>{'>'}</NextButton>
      <DotsContainer>
        {dots.map((dotIndex) => (
          <Dot key={dotIndex} active={dotIndex === currentSlide} onClick={() => handleDotClick(dotIndex)} />
        ))}
      </DotsContainer>
    </Container>
  )
}

export default Carousel
