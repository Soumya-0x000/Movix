export const navigation = ({dir, carouselContainer, pixels}) => {
    const container = carouselContainer.current
    
    const scrollAmount = (dir === 'left')
        ? container.scrollLeft - (container.offsetWidth + pixels)
        : container.scrollLeft + (container.offsetWidth + pixels)

    container.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
    })
}
