import Header from "../../components/header/Header.jsx";
import Footer from "../../components/footer/Footer.jsx";
import CardHome from "./CardHome.jsx";

const titles = [
  "Card 1", "Card 2", "Card 3"
]

const Home = () => {
  return (
    <>
      <Header/>
      <h1 className={"text-center"}>Hello World !</h1>
      <div className={"px-5 d-flex justify-content-between my-5"}>
        {
          titles.map((title, index) => (<CardHome title={title} key={index}/>))
        }
      </div>
      <Footer/>
    </>
  )
}

export default Home