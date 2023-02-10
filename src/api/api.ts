import * as list from '@/composables/page/list';
import * as main from '@/composables/page/main';
import * as sub from '@/composables/page/sub';
import * as conf from '@/composables/page/conf';

export const readList = async(): Promise<any> => {
  if (conf.state.data.save === `network`) {
    const data = await useFetch<string>(`/read`, {
      baseURL: `http://localhost:3001`,
      headers: {'Content-Type': `text/plain`},
      method: `GET`,
      query: {name: `list`},
    });
    return JSON.parse(data.data.value!);
  }
  return JSON.parse(localStorage.getItem(`list`)!);
};

export const writeList = (data: typeof list.state.data): void => {
  if (conf.state.data.save === `network`) {
    useFetch(`/write`, {
      baseURL: `http://localhost:3001`,
      headers: {'Content-Type': `text/plain`},
      method: `POST`,
      query: {name: `list`},
      body: data,
    });
  }
  localStorage.setItem(`list`, JSON.stringify(data));
};

export const readMain = async(): Promise<any> => {
  if (conf.state.data.save === `network`) {
    const data = await useFetch<string>(`/read`, {
      baseURL: `http://localhost:3001`,
      headers: {'Content-Type': `text/plain`},
      method: `GET`,
      query: {name: `main`},
    });
    return JSON.parse(data.data.value!);
  }
  return JSON.parse(localStorage.getItem(`main`)!);
};

export const writeMain = (data: typeof main.state.data): void => {
  if (conf.state.data.save === `network`) {
    useFetch(`/write`, {
      baseURL: `http://localhost:3001`,
      headers: {'Content-Type': `text/plain`},
      method: `POST`,
      query: {name: `main`},
      body: data,
    });
  }
  localStorage.setItem(`main`, JSON.stringify(data));
};

export const readSub = async(): Promise<any> => {
  if (conf.state.data.save === `network`) {
    const data = await useFetch<string>(`/read`, {
      baseURL: `http://localhost:3001`,
      headers: {'Content-Type': `text/plain`},
      method: `GET`,
      query: {name: `sub`},
    });
    return JSON.parse(data.data.value!);
  }
  return JSON.parse(localStorage.getItem(`sub`)!);
};

export const writeSub = (data: typeof sub.state.data): void => {
  if (conf.state.data.save === `network`) {
    useFetch(`/write`, {
      baseURL: `http://localhost:3001`,
      headers: {'Content-Type': `text/plain`},
      method: `POST`,
      query: {name: `sub`},
      body: data,
    });
  }
  localStorage.setItem(`sub`, JSON.stringify(data));
};

export const readConf = async(): Promise<any> => {
  if (conf.state.data.save === `network`) {
    const data = await useFetch<string>(`/read`, {
      baseURL: `http://localhost:3001`,
      headers: {'Content-Type': `text/plain`},
      method: `GET`,
      query: {name: `conf`},
    });
    return JSON.parse(data.data.value!);
  }
  return JSON.parse(localStorage.getItem(`conf`)!);
};

export const writeConf = (data: typeof conf.state.data): void => {
  if (conf.state.data.save === `network`) {
    useFetch(`/write`, {
      baseURL: `http://localhost:3001`,
      headers: {'Content-Type': `text/plain`},
      method: `POST`,
      query: {name: `conf`},
      body: data,
    });
  }
  localStorage.setItem(`conf`, JSON.stringify(data));
};

export const readRoute = async(): Promise<string> => {
  if (conf.state.data.save === `network`) {
    const data = await useFetch<string>(`read`, {
      baseURL: `http://localhost:3001`,
      headers: {'Content-Type': `text/plain`},
      method: `GET`,
      query: {name: `route`},
    });
    return data.data.value!;
  }
  return localStorage.getItem(`route`)!;
};

export const writeRoute = (data: string): void => {
  if (conf.state.data.save === `network`) {
    useFetch(`/write`, {
      baseURL: `http://localhost:3001`,
      headers: {'Content-Type': `text/plain`},
      method: `POST`,
      query: {name: `route`},
      body: data,
    });
  }
  localStorage.setItem(`route`, data);
};
