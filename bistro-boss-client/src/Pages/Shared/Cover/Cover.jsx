import { Parallax } from 'react-parallax';

const Cover = ({ img, title, text}) => {
  return (

    <Parallax
    blur={{ min: -15, max: 15 }}
    bgImage={img}
    bgImageAlt="the dog"
    strength={-200}
>
<div
      className="hero h-[700px]"
      
    >
      <div className=""></div>
      <div className="hero-content w-2/3 h-[300px] bg-[#15151599] text-center text-white">
        <div className="max-w-md font-cinzel ">
          <h1 className="mb-5 text-5xl font-bold">{title}</h1>
          <p className="mb-5">
          {text}
          </p>
        
        </div>
      </div>
    </div> />
</Parallax>
    
  );
};

export default Cover;
