"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import me3 from "../../me_3.jpg";
import me4 from "../../me_4.jpg";
import me5 from "../../me_5.jpg";

const photos = [me3, me4, me5];

export default function ContactForm() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % photos.length);
    }, 2400);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="contact-stage">
      <div className="contact-showcard">
        <div className="contact-photo-shell">
          {photos.map((photo, index) => (
            <Image
              key={photo.src}
              src={photo}
              alt={`飞飞鱼照片 ${index + 1}`}
              className={`contact-photo ${activeIndex === index ? "is-active" : ""}`}
              priority={index === 0}
            />
          ))}
        </div>

        <div className="contact-message-band-wrap">
          <div className="contact-message-band">
            <p className="contact-line contact-line-cn">欢迎与飞飞鱼交流分享您的一些想法</p>
            <p className="contact-line contact-line-mail">我的邮箱为 <span>15158089303@163.com</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
