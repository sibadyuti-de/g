/* -------------Toggle Navbar------------*/

const navToggler = document.querySelector(".nav-toggler");
navToggler.addEventListener("click", () => {
  hideSection();
  toggleNavbar();
  document.body.classList.toggle("hide-scroling");
});
function hideSection() {
  document.querySelector("section.active").classList.toggle("fade-out");
}
function toggleNavbar() {
  document.querySelector(".header").classList.toggle("active");
}

/*-------------Active Section---------------*/

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("link-item") && e.target.hash !== "") {
    // Activate the overlay to prevent multiple clicks
    document.querySelector(".overlay").classList.add("active");
    navToggler.classList.add("hide");
    if (e.target.classList.contains("nav-item")) {
      toggleNavbar();
    } else {
      hideSection();
      document.body.classList.add("hide-scrolling");
    }
    setTimeout(() => {
      document
        .querySelector("section.active")
        .classList.remove("active", "fade-out");
      document.querySelector(e.target.hash).classList.add("active");
      window.scrollTo(0, 0);
      document.body.classList.remove("hide-scrolling");
      navToggler.classList.remove("hide");
      document.querySelector(".overlay").classList.remove("active");
    }, 500);
  }
});

/* ------------About Tabs------------*/
const tabsContainer = document.querySelector(".about-tabs"),
  aboutSection = document.querySelector(".about-section");

tabsContainer.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("tab-item") &&
    !e.target.classList.contains("active")
  ) {
    tabsContainer.querySelector(".active").classList.remove("active");
    e.target.classList.add("active");
    const target = e.target.getAttribute("data-target");
    aboutSection
      .querySelector(".tab-content.active")
      .classList.remove("active");
    aboutSection.querySelector(target).classList.add("active");
  }
});

/*-------------------------Portfolio Item Details Popup-----------------------*/
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("view-project-btn")) {
    togglePortfolioPopup();
    document.querySelector(".portfolio-popup").scrollTo(0, 0);
    portfolioItemDetails(e.target.parentElement);
  }
});

function togglePortfolioPopup() {
  document.querySelector(".portfolio-popup").classList.toggle("open");
  document.body.classList.toggle("hide-scrolling");
  document.querySelector(".main").classList.toggle("fade-out");
}
document
  .querySelector(".pp-close")
  .addEventListener("click", togglePortfolioPopup);

// hide popup when clicking outside of it
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("pp-inner")) {
    togglePortfolioPopup();
  }
});

function portfolioItemDetails(portfolioItem) {
  document.querySelector(".pp-thumbnail img").src = portfolioItem.querySelector(
    ".portfolio-item-thumbnail img"
  ).src;

  document.querySelector(".pp-header h3").innerHTML =
    portfolioItem.querySelector(".portfolio-item-title").innerHTML;

  document.querySelector(".pp-body").innerHTML = portfolioItem.querySelector(
    ".portfolio-item-details"
  ).innerHTML;
}

/* ---------------- Fetch And Catch Json File --------------*/
 var j_data = "";

fetch("projects.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    json(data);
     j_data = data;
     var front = document.getElementById("filter_count");
    front.innerHTML = `Result : ${data.length}`;
  })
  .catch(function (err) {
    console.log("error: " + err);
});

/* --------------------- All list of Projects  ------------------------ */

function json(data) {
  var maindiv = document.getElementById("portfolio_item");
//   console.log(data);
  for (var i = 0; i < data.length; i++) {
    //   window.all_j_data = data;
    maindiv.innerHTML += `
                        <div class="portfolio-item ${data[i].portfolio_item_filter}">
                    <div class="portfolio-item-thumbnail">
                        <img src="${data[i].img_link}" alt="portfolio-item-thumb">
                    </div>
                    <h3 class="portfolio-item-title">${data[i].title}</h3>
                    <button type="button" class="btn view-project-btn">view project</button>
                    <div class="portfolio-item-details">
                        <div class="description">
                        <p>${data[i].description}</p>
                        </div>
                        <div class="general-info">
                        <ul>
                            <li>Created - <span>${data[i].created}</span></li>
                            <li>technologies used - <span>${data[i].technologies_used}</span></li>
                            <li>Role - <span>${data[i].role}</span></li>
                            <li>View Online - <span><a href="#" target="_blank">${data[i].blog_link}</a></span></li>
                        </ul>
                        </div>
                    </div>
                    </div>
                `;
  } 
}

/*  ------------------- Portfolio Filter --------------------*/
    // -------------- Data - Filter ------------------
    // ------ portfilio-filter-item show or hide------
$(document).ready(function () {
 var $btns = $(".portfolio-filter-item").click(function () {
         value = $(this).attr("data-filter");
        if (value == "all") {
          $(".portfolio-item").show("500");
        } 
        else {
          $(".portfolio-item")
            .not("." + value)
            .hide("500");
          $(".portfolio-item")
            .filter("." + value)
            .show("500");
        }
        //activate the button colour
        $btns.removeClass('active');
        $(this).addClass('active');
  });
});

// --------------------- Showing Results ----------------------

$(document).ready(function () {
  var front = document.getElementById("filter_count");
   $(".portfolio-filter-item").click(function () {
           value = $(this).attr("data-filter");
          if (value == "all") {
            front.innerHTML = `Result : ${j_data.length}`;
          } 
          else {
          var newArray = j_data.filter(function(ele){
           return ele.portfolio_item_filter == value;
            });
            front.innerHTML = `Result : ${newArray.length}`;
          } ///else close
    }); ///filter_count end
}); /// document end






