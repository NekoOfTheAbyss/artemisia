import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
import Canvas from "canvas";

export default async (member, server="kuro") => {
  const user = member.user

  const applyText = (canvas, text) => {
    const ctx = canvas.getContext('2d');

    // Declare a base size of the font
    let fontSize = 70;

    do {
      // Assign the font to the context and decrement it so it can be measured again
      ctx.font = `${fontSize -= 10}px "Blogger Sans" bold`;
    } while (ctx.measureText(text).width > canvas.width - 320);
    return ctx.font;
  };


  // CANVAS SHIT


  const canvas = Canvas.createCanvas(1200, 300);
  const ctx = canvas.getContext('2d');

  const background = await Canvas.loadImage(server == "eec" ? `${__dirname}/../assets/base_eec.png` : `${__dirname}/../assets/base.png`)
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  ctx.fill()

  ctx.strokeStyle = '#74037b';
  ctx.strokeRect(0, 0, canvas.width, canvas.height);



  ctx.font = applyText(canvas, server == "eec" ? "Welcome to EEC," : `Welcome to Kuro's Abyss,`);

  ctx.strokeStyle = '#000000';
  ctx.textAlign = "left";
  ctx.lineWidth = 4;

  ctx.shadowColor = "black";
  ctx.shadowBlur = 7;
  ctx.strokeText(server == "eec" ? "Welcome to EEC," : `Welcome to Kuro's Abyss,`, 320, canvas.height / 2);
  ctx.shadowBlur = 0;
  ctx.fillStyle = '#ffffff';
  ctx.fillText(server == "eec" ? "Welcome to EEC," : `Welcome to Kuro's Abyss,`, 320, canvas.height / 2);


  ctx.font = applyText(canvas, `${user.username}#${user.discriminator}`);

  ctx.strokeStyle = '#000000';
  ctx.textAlign = "left";
  ctx.lineWidth = 4;

  ctx.shadowColor = "black";
  ctx.shadowBlur = 7;
  ctx.strokeText(`${user.username}#${user.discriminator}`, 320, canvas.height / 1.4);
  ctx.shadowBlur = 0;
  ctx.fillStyle = '#ffffff';
  ctx.fillText(`${user.username}#${user.discriminator}`, 320, canvas.height / 1.4);





  const avatar = await Canvas.loadImage(user.staticAvatarURL);

  ctx.fillStyle = "#303030"
  ctx.drawImage(avatar, 15, 15, 270, 270);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.5)"
  ctx.lineWidth = 10;
  ctx.strokeRect(0, 0, canvas.width, canvas.height)
  return canvas

}
