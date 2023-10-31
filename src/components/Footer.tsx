import tinyfrog from "@/helpers/tinyfrog";
import Image from "next/image";
import Link from "next/link";

const Footer = async () => {
  const socials = await tinyfrog.content.get({ path: "collections/socials" });
  console.log(socials);
  return (
    <div className="flex justify-between container py-10 items-end text-slate-800">
      <div>
        <div className="font-semibold pb-5">Acme</div>
        <div className="flex gap-5">
          {socials.data.entries.map((social) => (
            <Link
              href={social.attributes.url}
              className=" text-slate-800"
              key={social.id}
            >
              <Image
                src={social.attributes.icon.url}
                height={15}
                width={15}
                alt="logo"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="text-xs">
        Built with ❤️ using{" "}
        <Link
          href={"https://tinyfrog.co"}
          className="underline hover:text-black"
        >
          tinyfrog
        </Link>
      </div>
    </div>
  );
};

export default Footer;
