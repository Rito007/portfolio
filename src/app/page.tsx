import Navbar from "@/app/components/navbar";

export default function Home() {
  const links = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];
  return (
    <div className="">
      <Navbar brand={"Miguel Rito"} links={links}></Navbar>
      <div className="w-full p-4">
        <div className=" flex justify-center md:w-1/2 ">
          <div className="avatar">
            <div className="w-24 rounded-full">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
