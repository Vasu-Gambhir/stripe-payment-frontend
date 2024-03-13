import Carousel from 'react-bootstrap/Carousel';

const Banner = () => {
  return (
    <div className='banner'>
      <Carousel
        variant='dark'
        indicators={false}
      >

        <Carousel.Item>
          <div className='carousel-img-wrapper'>
            <img
              className="carousel-img"
              src="images/banner2.webp"
              alt="First slide"
            />
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div className='carousel-img-wrapper'>
            <img
              className="carousel-img"
              src="images/banner1.webp"
              alt="Second slide"
            />
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div className='carousel-img-wrapper'>
            <img
              className="carousel-img"
              src="images/banner3.webp"
              alt="Third slide"
            />
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div className='carousel-img-wrapper'>
            <img
              className="carousel-img"
              src="images/banner4.webp"
              alt="Fourth slide"
            />
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div className='carousel-img-wrapper'>
            <img
              className="carousel-img"
              src="images/banner5.webp"
              alt="Fifth slide"
            />
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div className='carousel-img-wrapper'>
            <img
              className="carousel-img"
              src="images/banner6.webp"
              alt="Sixth slide"
            />
          </div>
        </Carousel.Item>
        
      </Carousel>

    </div>
  )
}

export default Banner;