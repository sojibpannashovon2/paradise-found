const Heading = ({ title, subtitle, center }) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <div className="text-2xl font-bold">{title}</div>
      <div className="text-xl font-semibold text-green-800  mt-2 font-monos">
        {subtitle}
      </div>
    </div>
  );
};

export default Heading;
