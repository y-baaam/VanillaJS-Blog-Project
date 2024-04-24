function Header() {
  return `
  <header class="w-full md:text-head text-subHead font-GmarketSansBold">
    <div class="h-full flex flex-row justify-between items-center">
      <a href="/" data-link class="block text-center p-5">y-baam</a>
      <nav>
        <ul class="m-0 p-0 flex overflow-hidden list-none">
          <a href="/posts" data-link class="no-underline visited:text-white-300 block text-center hover:bg-black-200 p-5 ">posts</a>
          <a href="/guestBook" data-link class="no-underline visited:text-white-300 block text-center hover:bg-black-200 p-5">guestbook</a>
        </ul>
      </nav>
    </div>
  </header>`;
}
export default Header;
