function Header() {
  return `
  <header class="w-full text-head-bold">
    <div class="h-full flex flex-row justify-between items-center">
      <a href="/" data-link class="block text-center p-5">y-baam</a>
      <nav>
        <ul class="m-0 p-0 flex overflow-hidden list-none">
          <li><a href="/posts" data-link class="no-underline visited:text-white-300 block text-center p-5">posts</a></li>
          <li><a href="/guestBook" data-link class="no-underline  visited:text-white-300 block text-center p-5">guestbook</a></li>
        </ul>
      </nav>
    </div>
  </header>`;
}
export default Header;
