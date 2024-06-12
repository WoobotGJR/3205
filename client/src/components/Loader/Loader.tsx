import './Loader.css';

interface LoaderProps {
  size: number;
  background: string;
}

const Loader: React.FC<LoaderProps> = ({ size, background }) => {
  const loaderStyle = {
    width: size, // Use size prop to set width
    height: size, // Use size prop to set height
    background: background, // Use background prop to set background
  };

  return <div className="loader" style={loaderStyle}></div>;
};

export default Loader;
