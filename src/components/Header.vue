<template>
  <header>
    <router-link to="/search">
      <img src="@/assets/images/logo.png" alt="TimeTracker Logo" class="logo" />
    </router-link>
    <nav>
      <router-link to="/search">Search</router-link>
       <router-link to="/logtime">Log</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
  methods: {
   
  },
  computed: {
   
  }
};
</script>

<style>
header {
  font-size: 2rem;
  height: 3rem;
  padding: 1em 2em;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  height: 1.5em;
}

.logo img {
  height: 100%;
}

nav {
  text-align: right;
}

nav a {
  margin-left: 1em;
}

nav a:hover {
  border-bottom: 2px solid var(--primary-color);
}

@media (max-width: 600px) {
  header {
    font-size: 1rem;
    height: 2rem;    
  }

  nav a:hover {
    border-bottom: 1px solid var(--primary-color);
  }
}
</style>