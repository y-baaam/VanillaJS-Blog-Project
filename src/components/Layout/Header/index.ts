const ACTIVE_CLASS = "text-white-200 shadow-[inset_0_-2px_0_#ffb86b]";
const INACTIVE_CLASS = "text-muted hover:text-white-200";

function Header() {
  const path = location.pathname;
  const menuClass = (active: boolean) =>
    `block py-1 ${active ? ACTIVE_CLASS : INACTIVE_CLASS}`;

  return `
  <header class="w-full border-b border-solid border-line">
    <div class="w-full sm:w-5/6 md:w-medium mx-auto h-16 px-4 flex flex-row justify-between items-center">
      <a href="/" data-link class="md:text-head text-subHead font-GmarketSansBold text-white-200">y-baam<span class="text-accent">.</span></a>
      <nav>
        <ul class="m-0 p-0 flex gap-5 list-none text-body font-GmarketSansMedium">
          <li><a href="/posts" data-link class="${menuClass(path.startsWith("/posts"))}">posts</a></li>
          <li><a href="/guestBook" data-link class="${menuClass(path === "/guestBook")}">guestbook</a></li>
        </ul>
      </nav>
    </div>
  </header>`;
}
export default Header;
