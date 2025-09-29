import "./Footer.css";

const Footer = () => {
  return (
    <footer className="bg-deep-blue text-white-ivory py-12 h-full text-center">
      <h2 className="text-3xl font-dancing mb-4">
        60 años no se cumplen todos los días…
        <br />✨ ¡Los esperamos para celebrarlo juntos! ✨
      </h2>
      <div className="relative h-60">
        <div className="cake">
          <div className="plate"></div>
          <div className="layer layer-bottom"></div>
          <div className="layer layer-middle"></div>
          <div className="layer layer-top"></div>
          <div className="icing"></div>
          <div className="drip drip1"></div>
          <div className="drip drip2"></div>
          <div className="drip drip3"></div>
          <div className="candle">
            <div className="flame"></div>
          </div>
        </div>
      </div>
      <h5 className="text-center text-white-ivory mt-20 font-montserrat">
        Hecho con ❤️ por <a href="https://www.instagram.com/silvia_suarez01/" target="_blank" className="text-gold">Silvia Natalia Suarez Gomez</a> ©2025
      </h5>
    </footer>
  );
};

export default Footer;
