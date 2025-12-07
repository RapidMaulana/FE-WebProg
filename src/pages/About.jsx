export default function About() {
  return (
    <>
      <div
        className="header h-[60vh] w-full"
        style={{
          backgroundImage: "url(/images/header/AboutPage.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "0 -180px",
        }}
      >
        <div className="header-text flex flex-col items-center justify-center gap-4 bg-black/45 w-full h-full text-white text-center">
          <h1 className="font-bold text-5xl">Kisah Kami</h1>
          <div className="line bg-grn w-[80px] h-1"></div>
          <p className="text-xl font-light max-w-[30%]">
            Setiap aroma bumbu Indonesia mengingatkan kami akan rumah,
            kehangatan, dan kebersamaan.
          </p>
        </div>
      </div>
      <div className="content m-10">
        <div className="first flex flex-row items-start">
          <div className="text">
            <h1 className="font-bold text-5xl">Awal Kami</h1>
            <div className="line bg-grn w-[80px] h-1 my-2"></div>
            <p className="text-xl">
              Setiap bahan makanan punya kesempatan kedua. Kami melihat begitu
              banyak makanan sisa yang sebenarnya masih bisa diolah menjadi
              hidangan lezat. Dari sinilah kami mulai membuat berbagai resep
              praktis dan kreatif, terinspirasi dari kekayaan kuliner Indonesia.
              Kami percaya bahwa memasak bukan sekadar aktivitas, tetapi cara
              untuk menghargai makanan dan mengurangi pemborosan
            </p>
          </div>
          <img src="favicon.png" alt="" />
        </div>
        <div className="second flex flex-col items-center mt-20 text-center">
          <h1 className="font-bold text-5xl">Tujuan Kami</h1>
          <div className="line bg-grn w-[80px] h-1 my-2"></div>
          <p className="font-light w-[20%]">
            Kami hadir untuk membantu lebih banyak orang memaksimalkan bahan
            yang mereka miliki di dapur.
          </p>
          <div className="items-wrapper w-[65%] flex flex-row gap-5 justify-center my-10">
            <div className="item bg-grn2 h-[260px] rounded-xl w-[280px] shadow-xl">

            </div>
            <div className="item bg-grn2 h-[260px] rounded-xl w-[280px] shadow-xl">

            </div>
            <div className="item bg-grn2 h-[260px] rounded-xl w-[280px] shadow-xl">

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
