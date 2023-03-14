<script>
  // read data from db
  import { liveQuery } from "dexie";
  import { db } from "~utils/store/indexedDB";

  // TODO: paging for list of chat
  // TODO: add copy to bubbles...
  // TODO: change to await?
  let selected_chat;
  let current_messages;
  let chats = liveQuery(async () => {
    const currentUsers = db.users.where("login").equals(1);
    const currentUser = await currentUsers.first();
    const user_id = currentUser.id;
    const chatsObserver = db.chats.where("user_id").equals(user_id);
    const result = chatsObserver.reverse().sortBy("created_time");
    result.then((r) => {
      selected_chat = r && r.length > 0 ? r[0] : selected_chat;
    }).catch((error) => {
      console.log(error);
    });
    return result;
  });
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
  <input class="drawer-toggle" id="my-drawer-3" type="checkbox" />
  <div class="drawer-content flex flex-col">
    <!-- Navbar -->
    <div class="w-full navbar bg-base-300">
      <div class="flex-none">
        <label class="btn btn-square btn-ghost drawer-button lg:hidden" for="my-drawer-3">
          <svg class="inline-block w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24"
               xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
          </svg>
        </label>
      </div>
      {#if selected_chat}
        <article class="prose lg:prose-xl">
          <h3 class="flex-1 md:prose-lg lg:prose-xl">{selected_chat.title}</h3>
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
  <div class="drawer-side w-72">
    <label class="drawer-overlay" for="my-drawer-3"></label>

    <ul class="menu bg-base-100">
      <input class="input w-full max-w-xs input-bordered" placeholder="Type here" type="text" />
      <!--      TODO: 删除-->
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
    </ul>

  </div>
</div>
