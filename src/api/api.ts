import * as list from '@/composables/page/list';
import * as main from '@/composables/page/main';
import * as sub from '@/composables/page/sub';
import * as conf from '@/composables/page/conf';

export const readList = async(): Promise<any> => {
  if (conf.state.data.save === `rest`) {
    const data = await useFetch<string>(`/read`, {
      baseURL: `http://localhost:3001`,
      headers: {'Content-Type': `text/plain`},
      method: `GET`,
      query: {name: `list`},
    });
    return JSON.parse(data.data.value!);
  } else if (conf.state.data.save === `gql`) {
    const response = await fetch(`http://localhost:3001/gql`, {
      method: `POST`,
      headers: {'Content-Type': `application/json`},
      body: JSON.stringify({query: `query {readList}`}),
    });
    const result = await response.json();
    return JSON.parse(result.data.readList);
  }
  return JSON.parse(localStorage.getItem(`list`)!);
};

export const writeList = (data: typeof list.state.data): void => {
  if (conf.state.data.save === `rest`) {
    useFetch(`/write`, {
      baseURL: `http://localhost:3001`,
      headers: {'Content-Type': `text/plain`},
      method: `POST`,
      query: {name: `list`},
      body: data,
    });
  } else if (conf.state.data.save === `gql`) {
    fetch(`http://localhost:3001/gql`, {
      method: `POST`,
      headers: {'Content-Type': `application/json`},
      body: JSON.stringify({
        query: `query GetWriteList($data: String!) {writeList(data: $data)}`,
        variables: {data: JSON.stringify(data)},
      }),
    });
  }
  localStorage.setItem(`list`, JSON.stringify(data));
};

export const readMain = async(): Promise<any> => {
  if (conf.state.data.save === `rest`) {
    const data = await useFetch<string>(`/read`, {
      baseURL: `http://localhost:3001`,
      headers: {'Content-Type': `text/plain`},
      method: `GET`,
      query: {name: `main`},
    });
    return JSON.parse(data.data.value!);
  } else if (conf.state.data.save === `gql`) {
    const response = await fetch(`http://localhost:3001/gql`, {
      method: `POST`,
      headers: {'Content-Type': `application/json`},
      body: JSON.stringify({query: `query {readMain}`}),
    });
    const result = await response.json();
    return JSON.parse(result.data.readMain);
  }
  return JSON.parse(localStorage.getItem(`main`)!);
};

export const writeMain = (data: typeof main.state.data): void => {
  if (conf.state.data.save === `rest`) {
    useFetch(`/write`, {
      baseURL: `http://localhost:3001`,
      headers: {'Content-Type': `text/plain`},
      method: `POST`,
      query: {name: `main`},
      body: data,
    });
  } else if (conf.state.data.save === `gql`) {
    fetch(`http://localhost:3001/gql`, {
      method: `POST`,
      headers: {'Content-Type': `application/json`},
      body: JSON.stringify({
        query: `query GetWriteMain($data: String!) {writeMain(data: $data)}`,
        variables: {data: JSON.stringify(data)},
      }),
    });
  }
  localStorage.setItem(`main`, JSON.stringify(data));
};

export const readSub = async(): Promise<any> => {
  if (conf.state.data.save === `rest`) {
    const data = await useFetch<string>(`/read`, {
      baseURL: `http://localhost:3001`,
      headers: {'Content-Type': `text/plain`},
      method: `GET`,
      query: {name: `sub`},
    });
    return JSON.parse(data.data.value!);
  } else if (conf.state.data.save === `gql`) {
    const response = await fetch(`http://localhost:3001/gql`, {
      method: `POST`,
      headers: {'Content-Type': `application/json`},
      body: JSON.stringify({query: `query {readSub}`}),
    });
    const result = await response.json();
    return JSON.parse(result.data.readSub);
  }
  return JSON.parse(localStorage.getItem(`sub`)!);
};

export const writeSub = (data: typeof sub.state.data): void => {
  if (conf.state.data.save === `rest`) {
    useFetch(`/write`, {
      baseURL: `http://localhost:3001`,
      headers: {'Content-Type': `text/plain`},
      method: `POST`,
      query: {name: `sub`},
      body: data,
    });
  } else if (conf.state.data.save === `gql`) {
    fetch(`http://localhost:3001/gql`, {
      method: `POST`,
      headers: {'Content-Type': `application/json`},
      body: JSON.stringify({
        query: `query GetWriteSub($data: String!) {writeSub(data: $data)}`,
        variables: {data: JSON.stringify(data)},
      }),
    });
  }
  localStorage.setItem(`sub`, JSON.stringify(data));
};

export const readConf = async(): Promise<any> => {
  if (conf.state.data.save === `rest`) {
    const data = await useFetch<string>(`/read`, {
      baseURL: `http://localhost:3001`,
      headers: {'Content-Type': `text/plain`},
      method: `GET`,
      query: {name: `conf`},
    });
    return JSON.parse(data.data.value!);
  } else if (conf.state.data.save === `gql`) {
    const response = await fetch(`http://localhost:3001/gql`, {
      method: `POST`,
      headers: {'Content-Type': `application/json`},
      body: JSON.stringify({query: `query {readConf}`}),
    });
    const result = await response.json();
    return JSON.parse(result.data.readConf);
  }
  return JSON.parse(localStorage.getItem(`conf`)!);
};

export const writeConf = (data: typeof conf.state.data): void => {
  if (conf.state.data.save === `rest`) {
    useFetch(`/write`, {
      baseURL: `http://localhost:3001`,
      headers: {'Content-Type': `text/plain`},
      method: `POST`,
      query: {name: `conf`},
      body: data,
    });
  } else if (conf.state.data.save === `gql`) {
    fetch(`http://localhost:3001/gql`, {
      method: `POST`,
      headers: {'Content-Type': `application/json`},
      body: JSON.stringify({
        query: `query GetWriteConf($data: String!) {writeConf(data: $data)}`,
        variables: {data: JSON.stringify(data)},
      }),
    });
  }
  localStorage.setItem(`conf`, JSON.stringify(data));
};

export const readRoute = async(): Promise<string> => {
  if (conf.state.data.save === `rest`) {
    const data = await useFetch<string>(`read`, {
      baseURL: `http://localhost:3001`,
      headers: {'Content-Type': `text/plain`},
      method: `GET`,
      query: {name: `route`},
    });
    return data.data.value!;
  } else if (conf.state.data.save === `gql`) {
    const response = await fetch(`http://localhost:3001/gql`, {
      method: `POST`,
      headers: {'Content-Type': `application/json`},
      body: JSON.stringify({query: `query {readRoute}`}),
    });
    const result = await response.json();
    return JSON.parse(result.data.readRoute);
  }
  return localStorage.getItem(`route`)!;
};

export const writeRoute = (data: string): void => {
  if (conf.state.data.save === `rest`) {
    useFetch(`/write`, {
      baseURL: `http://localhost:3001`,
      headers: {'Content-Type': `text/plain`},
      method: `POST`,
      query: {name: `route`},
      body: data,
    });
  } else if (conf.state.data.save === `gql`) {
    fetch(`http://localhost:3001/gql`, {
      method: `POST`,
      headers: {'Content-Type': `application/json`},
      body: JSON.stringify({
        query: `query GetWriteRoute($data: String!) {writeRoute(data: $data)}`,
        variables: {data: JSON.stringify(data)},
      }),
    });
  }
  localStorage.setItem(`route`, data);
};
