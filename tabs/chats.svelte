<script>
  // read data from db
  import { liveQuery } from "dexie";
  import { db } from "~utils/store/indexedDB";
  import { toastStore } from "~utils/store/toast";
  import Toast from "~components/Toast";
  // TODO: paging for list of chat
  // TODO: add copy button to bubbles...
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

  const deleteChat = async (chatId) => {
    if (confirm("Are you sure you want to delete this chat?")) {
      await db.chats.delete(chatId);
      toastStore.showToast("Chat deleted");
    }
  };

  const editChatTitle = (chat) => {
    const newTitle = prompt("Enter the new title:", chat.title);
    if (newTitle && newTitle !== chat.title) {
      db.chats.update(chat.id, { title: newTitle });
      toastStore.showToast("Chat title updated");
    }
  };
  const copyToClipboard = async (text, refs) => {
    try {
      let refText = "";

      if (refs && refs.length) {
        refText = refs
          .map((ref, index) => `${index + 1}. ${ref.title}: ${ref.href}`)
          .join("\n");
      }

      const fullText = `${text}\n\nReferences:\n${refText}`;

      await navigator.clipboard.writeText(fullText);
      toastStore.showToast("Copied to clipboard");
    } catch (error) {
      console.error("Error copying text: ", error);
    }
  };


</script>

<style>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    .btn-container .btn-ghost {
        opacity: 0;
        transition: opacity 0.3s;
    }

    .btn-container:hover .btn-ghost {
        opacity: 1;
    }

    .chat-bubble .btn-container .btn-ghost {
        opacity: 0;
        transition: opacity 0.3s;
    }

    .chat-bubble:hover .btn-container .btn-ghost {
        opacity: 1;
    }


    .bordered .btn-container {
        border-left: none;
    }
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

    </div>
    {#if selected_chat}
      <div class="detail">
        {#if current_messages}
          {#each ($current_messages || []) as message}
            {#if message.is_bing}
              <div class="chat chat-start">
                <div class="chat-bubble chat-bubble-info text-black">
                  {@html message.html}
                  <div class="divider"></div>
                  {#if message.refs && message.refs.length}
                    <ul class="refs-list">
                      {#each message.refs as ref (ref.index)}
                        <li>
                          <a class="link link-hover" href={ref.href} target="_blank" rel="noopener noreferrer">
                            {ref.index + 1}. {ref.title}
                          </a>
                        </li>
                      {/each}
                    </ul>
                  {/if}
                  <div
                    class="absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center space-x-2 btn-container">
                    <svg
                      class="btn btn-xs btn-square btn-ghost"
                      on:click={(e) => {e.stopPropagation(); copyToClipboard(message.body, message.refs);}}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  </div>
                </div>
              </div>
            {:else}
              <div class="chat chat-end">
                <div class="chat-bubble">
                  {message.body}
                  <div
                    class="absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center space-x-2 btn-container">
                    <svg
                      class="btn btn-xs btn-square btn-ghost"
                      on:click={(e) => {e.stopPropagation(); copyToClipboard(message.body, []);}}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  </div>
                </div>
              </div>
            {/if}
          {/each}
        {/if}
      </div>
    {/if}
    {#each $toastStore as toast (toast.id)}
      <Toast message={toast.message} />
    {/each}
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
      {#if chats}
        {#each ($chats || []) as chat (chat.id)}
          <li class="chat-title {selected_chat.id === chat.id? 'bordered': ''} relative"
              on:click={() => {
                selected_chat = chat;
          }}>
            <a class="pt-2 {selected_chat.id === chat.id? 'line-clamp-none': 'line-clamp-1 leading-[3rem]'} block">
              {chat.title}
            </a>
            <div class="absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center space-x-2 btn-container">
              <svg
                class="btn btn-xs btn-square btn-ghost"
                on:click={(e) => {e.stopPropagation(); editChatTitle(chat);}}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              <svg
                class="btn btn-xs btn-square btn-ghost"
                on:click={(e) => {e.stopPropagation(); deleteChat(chat.id);}}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
              </svg>
            </div>
          </li>
        {/each}

      {:else }
        <progress class="progress w-72"></progress>
      {/if}
    </ul>

  </div>


</div>
