import React from 'react'
import "./style.css";

const Home = () => {
  return (
    <div>
      <header className="item header margin-top-0">
        <div className="wrapper">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <div className="text-homeimage">
                  <div className="maintext-image" data-scrollreveal="enter top over 1.5s after 0.1s">
                    Increase Digital Sales
                  </div>
                  <div className="subtext-image" data-scrollreveal="enter bottom over 1.7s after 0.3s">
                    Boost revenue with Connect
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>


      {/* <!-- STEPS =============================--> */}
      <div className="item content">
        <div className="container toparea">
          <div className="row text-center">
            <div className="col-md-4">
              <div className="col editContent">
                <span className="numberstep"><i className="fa fa-shopping-cart"></i></span>
                <h3 className="numbertext">Choose our Products</h3>
                <p>
                  Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Nullam quis risus eget urna mollis ornare vel eu leo. Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                </p>
              </div>
              {/* <!-- /.col-md-4 --> */}
            </div>
            {/* <!-- /.col-md-4 col --> */}
            <div className="col-md-4 editContent">
              <div className="col">
                <span className="numberstep"><i className="fa fa-gift"></i></span>
                <h3 className="numbertext">Pay with PayPal or Card</h3>
                <p>
                  Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Nullam quis risus eget urna mollis ornare vel eu leo. Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                </p>
              </div>
              {/* <!-- /.col --> */}
            </div>
            {/* <!-- /.col-md-4 col --> */}
            <div className="col-md-4 editContent">
              <div className="col">
              <span className="numberstep"><i className="fa fa-shopping-cart"></i></span>
                <h3 className="numbertext">Choose our Services</h3>
                <p>
                  Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Nullam quis risus eget urna mollis ornare vel eu leo. Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>


     

  {/* <!-- BUTTON =============================--> */ }
  <div className = "item content" >
    <div className="container text-center">
      <a href="shop.html" className="homebrowseitems">Browse All Products
        <div className="homebrowseitemsicon">
          <i className="fa fa-star fa-spin"></i>
        </div>
      </a>
    </div>
</div>


{/* <!-- AREA =============================--> */ }
<div className="item content">
	<div className="container">
		<div className="row">
			<div className="col-md-4">
				<i className="fa fa-microphone infoareaicon"></i>
				<div className="infoareawrap">
					<h1 className="text-center subtitle">General Questions</h1>
					<p>
						 Want to buy a theme but not sure if it's got all the features you need? Trouble completing the payment? Or just want to say hi? Send us your message and we will answer as soon as possible!
					</p>
					<p className="text-center">
						<a href="#">- Get in Touch -</a>
					</p>
				</div>
			</div>
			{/* <!-- /.col-md-4 col --> */}
			<div className="col-md-4">
				<i className="fa fa-comments infoareaicon"></i>
				<div className="infoareawrap">
					<h1 className="text-center subtitle">Theme Support</h1>
					<p>
						 Theme support issues prevent the theme from working as advertised in the demo. This is a free and guaranteed service offered through our support forum which is found in each theme.
					</p>
					<p className="text-center">
						<a href="#">- Select Theme -</a>
					</p>
				</div>
			</div>
			{/* <!-- /.col-md-4 col --> */}
			<div className="col-md-4">
				<i className="fa fa-bullhorn infoareaicon"></i>
				<div className="infoareawrap">
					<h1 className="text-center subtitle">Hire Us</h1>
					<p>
						 If you wish to change an element to look or function differently than shown in the demo, we will be glad to assist you. This is a paid service due to theme support requests solved with priority.
					</p>
					<p className="text-center">
						<a href="#">- Get in Touch -</a>
					</p>
				</div>
			</div>
		</div>
	</div>
</div>


{/* <!--TESTIMONIAL ============================= --> */}
  <div className="item content">
    <div className="container">
      <div className="col-md-10 col-md-offset-1">
        <div className="slide-text">
          <div>
            <h2><span className="uppercase">Awesome Support</span></h2>
            <img src="http://wowthemes.net/demo/salique/salique-boxed/images/temp/avatar2.png" alt="Awesome Support" />
              <p>
                The support... I can only say it's awesome. You make a product and you help people out any way you can even if it means that you have to log in on their dashboard to sort out any problems that customer might have. Simply Outstanding!
              </p>
              <i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i>
          </div>
        </div>
      </div>
    </div>
  </div>


{/* <!-- CALL TO ACTION =============================--> */ }
{/* style="background-color:#00bba7; */}
<section className="content-block">
  <div className="container text-center">
    <div className="row">
      <div className="col-sm-10 col-sm-offset-1">
        <div className="item" data-scrollreveal="enter top over 0.4s after 0.1s">
          <h1 className="callactiontitle"> Promote Items Area Give Discount to Buyers <span className="callactionbutton"><i className="fa fa-gift"></i> WOW24TH</span>
          </h1>
        </div>
      </div>
    </div>
  </div>
</section>

    </div >
  )
}

export default Home