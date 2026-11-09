/* ============ SETTINGS ============ */
// Paste your Google Analytics 4 Measurement ID (looks like "G-XXXXXXXXXX") to turn on traffic tracking.
const GA_MEASUREMENT_ID = "";
// Where contact form messages are delivered.
const FORM_ENDPOINT = "https://formsubmit.co/ajax/rgibson@lawlerwood.com";
/* ================================== */

const CDN = "images/";

/* Analytics */
if (GA_MEASUREMENT_ID) {
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_MEASUREMENT_ID;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { dataLayer.push(arguments); };
  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID);
}
function track(name, params) { if (window.gtag) gtag("event", name, params || {}); }

const ORD = {1:"1st",2:"2nd",3:"3rd",4:"4th",5:"5th"};
const money = n => "$" + n.toLocaleString("en-US");

/* Lightbox (any button marked data-zoom) */
const lb = document.getElementById("lightbox"), lbImg = document.getElementById("lightboxImg");
function openLightbox(img) { lbImg.src = img.src; lbImg.alt = img.alt; lb.showModal(); }
document.querySelectorAll("[data-zoom]").forEach(b => b.addEventListener("click", () => openLightbox(b.querySelector("img"))));
lb.addEventListener("click", e => { if (e.target === lb) lb.close(); });

/* Mobile menu */
const menuBtn = document.getElementById("menuBtn"), nav = document.getElementById("nav");
const siteHeader = document.getElementById("siteHeader");
menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(open));
  siteHeader.classList.toggle("menu-open", open);
});
/* Home page: header is clear over the photo, solid once you scroll */
const onScroll = () => siteHeader.classList.toggle("scrolled", window.scrollY > 40);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* Residences page. Data: [plan, bedrooms (0 = studio), baths, size, starting price] */
const floorsEl = document.getElementById("floors");
if (floorsEl) {
  const FLOORS = {
    1: { plate: "web/level-1.webp", units: [
      ["A1",0,1,"432–450",259200],["A1.1",0,1,"520",312000],["B1",1,1,"578–588",349500],
      ["B1.1",1,1,"575–603",345000],["B1.2",1,1,"602",361200],["B3",1,1,"759–765",455400],
      ["C1",2,2,"954–962",572400],["C2",2,2,"1,070–1,101",642000],["C2.1",2,2,"1,157–1,160",694200]]},
    2: { plate: "web/level-2jpg.webp", units: [
      ["B1",1,1,"578–589",349500],["B1.1",1,1,"575–603",345000],["B2",1,1,"720–725",432000],
      ["B3",1,1,"759–765",455400],["C1",2,2,"954–962",572400],["C1.1",2,2,"823–825",493800],
      ["C2",2,2,"1,070–1,101",642000],["C2.1",2,2,"1,156–1,160",694200]]},
    3: { plate: "web/level-3.webp", units: [
      ["B1",1,1,"578–588",349500],["B1.1",1,1,"575–603",345000],["B2",1,1,"720–725",432000],
      ["B3",1,1,"759–765",455400],["C1",2,2,"954–962",572400],["C1.2",2,2,"821",492600],
      ["C2",2,2,"1,070–1,101",642000],["C2.1",2,2,"1,157–1,160",694200]]},
    4: { plate: "web/level-4.webp", units: [
      ["B1",1,1,"578–589",349500],["B1.1",1,1,"575–603",345000],["B2",1,1,"720–725",432000],
      ["B3",1,1,"759–765",455400],["C1",2,2,"954–962",572400],["C1.1",2,2,"823–825",493800],
      ["C2",2,2,"1,070–1,101",642000],["C2.1",2,2,"1,156–1,160",694200]]},
    5: { plate: "web/level-5.webp", units: [
      ["B1",1,1,"578–589",349500],["B1.1",1,1,"575–603",345000],["B2",1,1,"720–725",432000],
      ["B3",1,1,"759–765",455400],["C1",2,2,"954–962",572400],["C1.1",2,2,"823–825",493800],
      ["C2",2,2,"1,070–1,101",642000],["C2.1",2,2,"1,156–1,160",694200]]}
  };
  const PLAN_IMG = {"A1":"a1-md105.webp","A1.1":"a1.1-md106.webp","B1":"b1-md107.webp","B1.1":"b1.1-md108.webp","B1.2":"b1.2-md109.webp","B2":"b2-md110.webp","B3":"b3-md111.webp","C1":"c1-md112.webp","C1.1":"c1.1-md113.webp","C1.2":"c1.2-md114.webp","C2":"c2-md115.webp","C2.1":"c2.1-md116.webp"};
  let floor = 1, bed = "all";
  const renderUnits = () => {
    floorsEl.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", String(+b.dataset.floor === floor)));
    document.querySelectorAll("#filters button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.bed === bed)));
    document.getElementById("unitsCaption").textContent = ORD[floor] + " floor";
    const img = document.getElementById("plateImg");
    img.src = CDN + FLOORS[floor].plate;
    img.alt = "Layout of the " + ORD[floor] + " floor";
    const list = FLOORS[floor].units.filter(u => bed === "all" || String(u[1]) === bed);
    const rows = document.getElementById("unitRows");
    rows.innerHTML = "";
    list.forEach(u => {
      const tr = document.createElement("tr");
      const q = "contact.html?plan=" + encodeURIComponent(u[0]) + "&floor=" + floor;
      tr.innerHTML =
        "<td>Unit " + u[0] + "</td>" +
        "<td class='meta'>" + (u[1] === 0 ? "Studio" : u[1] + "<span class='mob'> bed</span>") + "</td>" +
        "<td class='meta'>" + u[2] + "<span class='mob'> bath</span></td>" +
        "<td class='meta'>" + u[3] + " SF</td>" +
        "<td class='price'>" + money(u[4]) + "</td>" +
        "<td>" + (PLAN_IMG[u[0]] ? "<button type='button' class='link-btn plan-btn'>View plan</button>" : "") + "<a class='link-btn' href='" + q + "'>Ask about this plan</a></td>";
      const pb = tr.querySelector(".plan-btn");
      if (pb) pb.addEventListener("click", () => { lbImg.src = CDN + PLAN_IMG[u[0]]; lbImg.alt = "Floor plan for Unit " + u[0]; lb.showModal(); track("view_plan", { plan: u[0], floor: floor }); });
      tr.querySelector("a").addEventListener("click", () => track("plan_inquiry_click", { plan: u[0], floor: floor }));
      rows.appendChild(tr);
    });
    const empty = document.getElementById("unitsEmpty");
    empty.hidden = list.length > 0;
    if (!list.length) empty.textContent = "No " + (bed === "0" ? "studios" : bed + "-bedroom plans") + " on the " + ORD[floor] + " floor. Studios are on the 1st floor only.";
  };
  [5,4,3,2,1].forEach(n => {
    const min = Math.min(...FLOORS[n].units.map(u => u[4]));
    const b = document.createElement("button");
    b.type = "button"; b.dataset.floor = n;
    b.setAttribute("aria-label", ORD[n] + " floor");
    b.innerHTML = "<b>" + n + "</b><span>" + FLOORS[n].units.length + " plans<br>from " + money(min) + "</span>";
    b.addEventListener("click", () => { floor = n; renderUnits(); track("select_floor", { floor: n }); });
    floorsEl.appendChild(b);
  });
  document.querySelectorAll("#filters button").forEach(b =>
    b.addEventListener("click", () => { bed = b.dataset.bed; renderUnits(); }));
  document.getElementById("plateBtn").addEventListener("click", () => openLightbox(document.getElementById("plateImg")));
  renderUnits();
}

/* Neighborhood page. Data: [name, address, note, website] */
const tabsEl = document.getElementById("tabs");
if (tabsEl) {
  const HOOD = [
    { name: "Food", img: "web/pexels-vlada-karpovich-6947298.webp", alt: "A stack of pancakes topped with blueberries", places: [
      ["French Market Crêperie","412 Clinch Avenue","Sweet and savory crêpes and espresso.","https://www.thefrenchmarketknoxville.com/"],
      ["Stock & Barrel","35 Market Square","Burgers and a deep bourbon list.","https://thestockandbarrel.com"],
      ["Tupelo Honey","1 Market Square","Southern comfort food, all day.","https://tupelohoneycafe.com"],
      ["J.C. Holdway","501 Union Avenue","Refined Southern cooking from James Beard Award winner Joseph Lenn.","https://jcholdway.com"],
      ["Emilia","16 Market Square","Regional Italian with house-made pasta.","https://emiliaknox.com"],
      ["Chesapeake’s","415 Locust Street","Eastern Shore-style seafood house.","https://chesapeakes.com"],
      ["Kaizen","127 S Central Street","Asian fusion small plates made for sharing.","https://knoxkaizen.com"],
      ["Kefi","120 E Jackson Avenue","Upscale Greek and serious cocktails.","https://kefiknox.com"],
      ["Potchke","318 N Gay Street","Michelin-recommended deli. Open 9 to 3 daily.","https://potchkedeli.com"],
      ["Ruby Sunshine","37 Market Square","New Orleans-style brunch, all day.","https://rubybrunch.com"],
      ["Yassin’s Falafel House","333 W Depot Avenue","Falafel and hummus made fresh daily.","https://yassinfalafelhouse.com"],
      ["Soccer Taco","9 Market Square","Mexican food with the match always on.","https://soccertaco.com"],
      ["Chivo Taqueria","314 S Gay Street","Tacos, tequila and award-winning margaritas.","https://chivotaqueria.com"],
      ["Nama Sushi Bar","506 S Gay Street","A longtime Knoxville favorite for sushi.","https://namasushibar.com"]]},
    { name: "Breweries", img: "web/olivia-bauso-jg2a11wrkby-unsplash.webp", alt: "A flight of drinks on a bar", places: [
      ["Balter Beerworks","100 S Broadway","Scratch kitchen and brewery in a converted service station.","https://balterbeerworks.com"],
      ["Pretentious Beer Co.","131 S Central Street","Experimental beer served in glassware blown in-house.","https://pretentiousbeerco.com"],
      ["Downtown Grill & Brewery","424 S Gay Street","Beer brewed on site, plus steaks and pub classics.","http://www.downtownbrewery.com/"],
      ["Pour Taproom","207 W Jackson Avenue","Self-pour craft beer, cider and wine.","https://pourtaproom.com"],
      ["Schulz Bräu Brewing Company","126 Bernard Avenue","German lagers and a big Bavarian beer garden.","https://schulzbraubrewing.com"],
      ["Xül Beer Co.","213 E 5th Avenue","Taproom and beer garden in a 1960s car showroom.","https://xulbeer.com/home/"],
      ["Yee-Haw Brewing","745 N Broadway","Easygoing taproom with room to gather.","https://yeehawbrewing.com"],
      ["Barrelhouse by Gypsy Circus","621 Lamar Street","Wild cider and barrel-aged pours.","https://gypsycircuscider.com"]]},
    { name: "Family & events", img: "market-square.avif", alt: "People gathered in Market Square on a sunny day", places: [
      ["Market Square","402 Walnut Street","Shops, restaurants, concerts, festivals and the farmers’ market.","https://downtownknoxville.org"],
      ["Dogwood Arts","123 W Jackson Avenue","Year-round arts events and the spring festival, since 1955.","https://dogwoodarts.com"],
      ["World’s Fair Park","963 World’s Fair Park Drive","The Sunsphere, the amphitheater and a wide performance lawn.","https://www.worldsfairpark.org/"]]},
    { name: "Work & study", img: "web/shridhar-gupta-dzxqn4vev2m-unsplash.webp", alt: "People working at desks under string lights", places: [
      ["Old City Java","109 S Central Street","Neighborhood coffee shop, pouring since 1991.","https://www.facebook.com/oldcityjava"],
      ["CoKno","129 S Gay Street","Coworking for freelancers, writers and founders.","https://cokno.org"],
      ["Lawson McGhee Library","500 W Church Avenue","Knoxville’s main public library.","https://knoxcountylibrary.com"],
      ["Maker Exchange","710 Clinch Avenue","Coffee, a bar and a shop featuring local makers.","https://www.makerexchangeknox.com/"],
      ["Awaken Coffee","125 W Jackson Avenue","Espresso, pour-overs and house-made pastries.","https://www.downtownknoxville.org/awaken-coffee/"]]},
    { name: "Trails & parks", img: "web/riverwalk-1200-900.webp", alt: "A walkway in downtown Knoxville", places: [
      ["Volunteer Landing","400 Neyland Drive","Riverfront park with walking paths along the Tennessee River.","https://www.knoxvilletn.gov/government/city_departments_offices/parks_and_recreation/parks/volunteer_landing_park"],
      ["World’s Fair Park","963 World’s Fair Park Drive","Open lawns around the Sunsphere.","https://worldsfairpark.org"],
      ["Neyland Greenway","2401 Neyland Drive","Paved riverside trail from downtown to the UT campus.","https://www.knoxvilletn.gov/government/city_departments_offices/parks_and_recreation/greenways_trails/neyland_greenway"],
      ["James White Greenway","1640 Riverside Drive","Quiet riverside path for walking, running and biking.","https://www.knoxvilletn.gov/government/city_departments_offices/parks_and_recreation/greenways_trails/james_white_greenway"],
      ["Urban Wilderness","1515 Tilson Street","Miles of forest trails minutes from downtown.","https://legacyparks.org/"],
      ["Sequoyah Hills Park","1400 Cherokee Boulevard","Fields, a riverfront trail and water access.","https://www.knoxvilletn.gov/government/city_departments_offices/parks_and_recreation/parks/sequoyah_park"]]},
    { name: "Fitness", img: "web/samuel-girven-vj2s0c20qco-unsplash.webp", alt: "Close-up of a weight rack", places: [
      ["Lindsay Young Downtown YMCA","605 Clinch Avenue","Gym, classes and community programs.","https://ymcaetn.org"],
      ["Old City Athletic Club","124 W Jackson Avenue","Full-service gym in the Old City.","https://oldcityathleticclub.com"],
      ["Fitness Studio 111","111 N Central Street","Private and semi-private personal training.","https://fitnessstudio111.com"],
      ["Forté Fitness","1060 World’s Fair Park Drive","Strength training, coaching and group classes.","https://fortefitnesstn.com"],
      ["Yoga Central","213 E 5th Avenue","Yoga classes for every level.","https://myyogacentral.com"],
      ["Eddie’s Health Shoppe","455 Union Avenue","Locally owned vitamins and supplements.","https://eddieshealthshoppe.com"]]},
    { name: "Nightlife", img: "web/tn-sign-1200-900.webp", alt: "Downtown Knoxville at night", places: [
      ["Five Thirty Lounge","530 S Gay Street","Rooftop bar with skyline and mountain views.","https://www.fivethirtylounge.com/"],
      ["Peter Kern Library","407 Union Avenue","Speakeasy tucked behind the Oliver Hotel lobby.","https://theoliverhotel.com"],
      ["Preservation Pub","28 Market Square","Live music and a rooftop on Market Square.","https://scruffycity.com/preservation-pub/"],
      ["The Mill & Mine","227 W Depot Avenue","Concert hall for touring acts.","https://themillandmine.com/"],
      ["Brother Wolf","108 W Jackson Avenue","Cocktail bar in the Old City.","https://brotherwolf.com/"],
      ["Radius Rooftop","507 S Gay Street","Cocktails and small plates above Gay Street.","https://www.radiusrooftopbar.com/"],
      ["The Vault","531 S Gay Street","Cocktail lounge in a former bank vault.","https://www.thevaultknoxville.com/"],
      ["Knox Box Karaoke","522 S Gay Street","Private karaoke rooms and a full bar.","https://knoxboxkaraoke.com"]]},
    { name: "Groceries", img: "web/farmers-market-1200-900.webp", alt: "A box of fresh produce", places: [
      ["Red Panda Grocery","123 S Central Street","Asian and international groceries in the Old City.","https://redpandagrocery.com"],
      ["Market Square Farmers’ Market","402 Walnut Street","Seasonal market with local growers and makers.","https://downtownknoxville.org"],
      ["Three Rivers Market","1100 N Central Street","Community co-op with local produce and specialty goods.","https://www.threeriversmarket.coop/"]]},
    { name: "Pets", img: "web/worlds-fair-park-1200-900.webp", alt: "World’s Fair Park lawn", places: [
      ["PetSafe Downtown Dog Park","200 S Central Street","Fenced, off-leash park a short walk away.",""],
      ["The Bark","601 Lamar Street","Indoor and outdoor dog park with daycare and a beer garden.","https://thebarkknoxville.com/"],
      ["Downtown Knoxville Veterinary","27 Emory Place","Full-service clinic for dogs and cats.","https://downtownknoxvet.com/"],
      ["PetWellClinic","308 Randolph Street","Walk-in wellness care and vaccinations.","https://www.petwellclinic.com/wp/location/randolph-street/"],
      ["Central Veterinary Hospital","1212 Clinch Avenue","Checkups, wellness and emergency care.","https://www.centralvethospital.com/"],
      ["PAWZ Dog Services","410 W Blount Avenue","Daycare, boarding and grooming.","https://pawzdogservices.com/"]]}
  ];
  const renderHood = i => {
    tabsEl.querySelectorAll("button").forEach((b, k) => b.setAttribute("aria-selected", String(k === i)));
    const c = HOOD[i];
    const img = document.getElementById("hoodImg");
    img.src = CDN + c.img; img.alt = c.alt;
    const ul = document.getElementById("places");
    ul.innerHTML = "";
    c.places.forEach(p => {
      const li = document.createElement("li");
      const title = p[3]
        ? "<a href='" + p[3] + "' target='_blank' rel='noopener'>" + p[0] + "</a>"
        : "<strong>" + p[0] + "</strong>";
      li.innerHTML = title + "<p>" + p[2] + "</p><p>" + p[1] + "</p>";
      ul.appendChild(li);
    });
  };
  HOOD.forEach((c, i) => {
    const b = document.createElement("button");
    b.type = "button"; b.setAttribute("role", "tab"); b.setAttribute("aria-controls", "hoodPanel");
    b.textContent = c.name;
    b.addEventListener("click", () => renderHood(i));
    tabsEl.appendChild(b);
  });
  renderHood(0);
}

/* Contact page */
const form = document.getElementById("contactForm");
if (form) {
  const statusEl = document.getElementById("formStatus"), sendBtn = document.getElementById("sendBtn");
  const qs = new URLSearchParams(location.search), plan = qs.get("plan"), fl = qs.get("floor");
  if (plan && /^[A-C][0-9.]{1,3}$/.test(plan) && ORD[fl]) {
    document.getElementById("message").value = "I’m interested in Unit " + plan + " on the " + ORD[fl] + " floor. ";
  }
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    if (data._honey) return;
    sendBtn.disabled = true; sendBtn.textContent = "Sending…";
    statusEl.className = "form-status"; statusEl.textContent = "";
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error("Request failed");
      form.reset();
      statusEl.className = "form-status ok";
      statusEl.textContent = "Message sent. We’ll be in touch soon.";
      track("generate_lead", { method: "contact_form" });
    } catch (err) {
      statusEl.className = "form-status err";
      statusEl.textContent = "Your message didn’t send. Try again, or email bpetre@lawlerwood.com.";
    } finally {
      sendBtn.disabled = false; sendBtn.textContent = "Send message";
    }
  });
}
