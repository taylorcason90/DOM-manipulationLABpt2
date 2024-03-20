//DOM MANIPULATION PART 2

//________________________Creating a Menu Bar______________
var menuLinks = [
  {text: 'about', href: '/about'},
  {text: 'catalog', href: '#', subLinks: [
    {text: 'all', href: '/catalog/all'},
    {text: 'top selling', href: '/catalog/top'},
    {text: 'search', href: '/catalog/search'},
  ]},
  {text: 'orders', href: '#' , subLinks: [
    {text: 'new', href: '/orders/new'},
    {text: 'pending', href: '/orders/pending'},
    {text: 'history', href: '/orders/history'},
  ]},
  {text: 'account', href: '#', subLinks: [
    {text: 'profile', href: '/account/profile'},
    {text: 'sign out', href: '/account/signout'},
  ]},
];
//Part 1

//Select and cache the <main> element in a variable named mainEl.
// Set the background color of mainEl to the value stored in the --main-bg CSS custom property.
// Add a class of flex-ctr to mainEl.
const mainEl = document.querySelector('main');
mainEl.style.backgroundColor = 'var(--main-bg)';
mainEl.innerHTML = '<h1>DOM Manipulation</h1>';
mainEl.classList.add("flex-ctr");
// Part 2 


//select and cache the <nav id="top-menu"> element in a variable named topMenuEl.
// Set the height of the topMenuEl element to be 100%.
// Set the background color of topMenuEl to the value stored in the --top-menu-bg CSS custom property.
// Add a class of flex-around to topMenuEl.
const topMenuEl = document.getElementById("top-menu");
topMenuEl.style.height = "100%";
topMenuEl.style.backgroundColor = 'var(--top-menu-bg)';
topMenuEl.classList.add("flex-around");
// Part 3
//part 4
//part 5


const nav = document.querySelector('nav')
menuLinks.forEach((item) => {
    newItem = document.createElement('a');
    newItem.textContent = item.text;
    newItem.href = item.href;
    nav.appendChild(newItem);
    console.log(newItem)
})
const subMenuEl = document.getElementById("sub-menu");
subMenuEl.style.height = "100%";
subMenuEl.style.backgroundColor = 'var(--sub-menu-bg)';
subMenuEl.classList.add("flex-around");
subMenuEl.style.position = "absolute";
subMenuEl.style.top = "0";
const topMenuLinks = document.querySelectorAll('a');
topMenuEl.addEventListener("click", (event) => {
  event.preventDefault();

  // Check if the clicked element is an <a> tag and does not have class "active"
  if (event.target.tagName.toLowerCase() === 'a' && !event.target.classList.contains('active')) {
    // Remove "active" class from all links
    topMenuLinks.forEach(link => link.classList.remove('active'));
    // Add "active" class to the clicked link
    event.target.classList.add("active");
    // Check if the corresponding item in menuLinks has subLinks
    const index = Array.from(topMenuLinks).indexOf(event.target);
    if (index >= 0 && menuLinks[index].subLinks) {
      // Set the CSS top property of subMenuEl to 100%
      subMenuEl.style.top = "100%";
        // Build submenu based on the clicked link's subLinks
        buildSubmenu(menuLinks[index].subLinks);
     }
  }
  else {
    // If there are no subLinks, hide the sub menu
    subMenuEl.style.top = "0";
  }
});
function buildSubmenu(subLinks) {
  // Clear the current contents of subMenuEl
  subMenuEl.innerHTML = '';
  // Iterate over the subLinks array adding subMenuItems to subMenu
  subLinks.forEach(link => {
    const subMenuItem = document.createElement('a');
    subMenuItem.href = link.href;
    subMenuItem.textContent = link.text;
    subMenuEl.appendChild(subMenuItem);
  });
}
// Attach a delegated 'click' event listener to subMenuEl
subMenuEl.addEventListener('click', (event) => {
  event.preventDefault();
  if (event.target.tagName.toLowerCase() !== 'a') {
    return;
  }
  console.log(event.target.textContent);
  // Set the CSS top property of subMenuEl to 0
  subMenuEl.style.top = '0';
  // Remove the active class from each <a> element in topMenuLinks
  topMenuLinks.forEach(link => link.classList.remove('active'));
  // Update the contents of mainEl within an <h1> to the contents of the <a> element clicked within subMenuEl
  mainEl.innerHTML = `<h1>${event.target.textContent}</h1>`;
});