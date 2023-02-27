<script>
  // read data from db
  import { liveQuery } from "dexie";
  import { db } from "~utils/store/indexedDB";

  let selected_chat;
  let current_messages;
  let chats = liveQuery(async () => {
    const currentUsers = db.users.where("login").equals(1);
    const currentUser = await currentUsers.first();
    const user_id = currentUser.id;
    const chatsObserver = db.chats.where("user_id").equals(user_id);
    const result = chatsObserver.toArray();
    result.then((r) => {
      selected_chat = r && r.length > 0 ? r[0] : selected_chat;
    }).catch((error) => {
      console.log(error);
    });
    return result;
  });
  $: if (selected_chat) {
    current_messages = liveQuery(async () => {
      return db.messages.where("chat_id").equals(selected_chat.id).toArray();
    });
  }
</script>
<style>
    .main {
        min-width: 300px;
        display: flex;
        flex-direction: row;
    }

    .chat-title {
        padding: 10px;
    }

    .list {
        min-width: 200px;
    }

    .question {
        background: deepskyblue;
    }

    .answer {
        background: blanchedalmond;
    }
</style>


<div class="main">
  <div class="list">
    {#each ($chats || []) as chat (chat.id)}
      <div class="chat-title" on:click={() => {
        selected_chat = chat;
      }}>
        {chat.title}
      </div>
    {/each}
  </div>
  {#if selected_chat}
    <div class="detail">
      <h3>{selected_chat.title}</h3>
      {#if current_messages}
        {#each ($current_messages || []) as message}
          {#if message.is_bing}
            <div class="question">
              {message.body}
            </div>
          {:else}
            <div class="answer">
              {message.body}
            </div>
          {/if}
        {/each}
      {/if}
    </div>
  {/if}
</div>
