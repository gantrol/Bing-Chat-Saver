<script>
  // read data from db
  import { liveQuery } from "dexie";
  import { db } from "~utils/store/indexedDB";

  // TODO: paging for list of chat
  // TODO: add copy to bubbles...
  let selected_chat;
  let current_messages;
  let search = "";

  const searchChats = (search) => {
    return liveQuery(async () => {
      const currentUsers = db.users.where("login").equals(1);
      const currentUser = await currentUsers.first();
      const user_id = currentUser.id;
      const chatsObserver = db.chats.where("user_id").equals(user_id);
      if (search) {
        chatsObserver.filter((chat) => {
          return chat.title.toLowerCase().includes(search.toLowerCase());
        });
      }
      const result = chatsObserver.reverse().sortBy("created_time");
      result.then((r) => {
        selected_chat = r && r.length > 0 ? r[0] : selected_chat;
      }).catch((error) => {
        console.log(error);
      });
      return result;
    });
  };

  $: chats = searchChats(search);
  $: if (selected_chat) {
    current_messages = liveQuery(async () => {
      return db.messages.where("chat_id").equals(selected_chat.id).sortBy("order");
    });
  }

</script>

<style>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

</style>
<div class="drawer drawer-mobile text-lg">
  <input class="drawer-toggle" id="chat-drawer" type="checkbox" />
  <div class="drawer-content flex flex-col">
    <!-- Navbar -->
    <div class="w-full navbar bg-base-300">
      <div class="flex-none">
        <label class="btn btn-square btn-ghost drawer-button lg:hidden" for="chat-drawer">
          <svg class="inline-block w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24"
               xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
          </svg>
        </label>
      </div>
      {#if selected_chat}
        <article class="prose lg:prose-xl">
          <h3 class="flex-1 md:prose-lg lg:prose-xl line-clamp-1">{selected_chat.title}</h3>
        </article>
      {/if}
      <!--      <div class="flex-none hidden lg:block">-->
      <!--        <ul class="menu menu-horizontal">-->
      <!--          &lt;!&ndash;          TODO: ...&ndash;&gt;-->
      <!--          &lt;!&ndash; Navbar menu content here &ndash;&gt;-->
      <!--          &lt;!&ndash;          <li><a>Navbar Item 1</a></li>&ndash;&gt;-->
      <!--          &lt;!&ndash;          <li><a>Navbar Item 2</a></li>&ndash;&gt;-->
      <!--        </ul>-->
      <!--      </div>-->
    </div>
    {#if selected_chat}
      <div class="detail">
        {#if current_messages}
          {#each ($current_messages || []) as message}
            {#if message.is_bing}
              <div class="chat chat-start">
                <div class="chat-bubble chat-bubble-info text-black">
                  <!--                  TODO: add metas...-->
                  <!--                  TODO: add refs, links...-->
                  <!--                  TODO: overflow auto-->
                  {@html message.html}
                </div>
              </div>
            {:else}
              <div class="chat chat-end">
                <div class="chat-bubble bg-base-200 text-blue-900">
                  {message.body}
                </div>
              </div>
            {/if}
          {/each}
        {/if}
      </div>
    {/if}
  </div>
  <div class="drawer-side">
    <label class="drawer-overlay" for="chat-drawer"></label>
    <ul class="menu bg-base-100 w-72">
      <label class="relative block">
        <span class="sr-only">Search</span>
        <span class="absolute inset-y-0 left-0 flex items-center pl-2">
          <svg
            class="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
          <path
            class="text-blue-500"
            clip-rule="evenodd"
            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
            fill-rule="evenodd" />
        </svg>
        </span>
        <input
          bind:value={search}
          class="block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3
              shadow-sm focus:outline-none
              focus:border-blue-500 focus:ring-sky-300 focus:ring-0.5"
          name="search" type="text" />
      </label>
      <!--      TODO: 删除-->
      {#if chats}
        {#each ($chats || []) as chat (chat.id)}
          <li class="chat-title {selected_chat.id === chat.id? 'bordered': ''}"
              on:click={() => {
                selected_chat = chat;
          }}>
            <a class="pt-2 {selected_chat.id === chat.id? 'line-clamp-none': 'line-clamp-1 leading-[3rem]'}">
              {chat.title}
            </a>
          </li>
        {/each}
      {:else }
        <progress class="progress w-72"></progress>
      {/if}
    </ul>

  </div>
</div>
