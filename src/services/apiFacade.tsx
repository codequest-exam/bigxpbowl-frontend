export interface Reservation {
  id: number;
  name: string;
  phoneNumber: string;
  participants: number;
    activities: Array<string>;
}

const API_URL = "http://localhost:8080/";

async function getReservations(): Promise<Array<Reservation>> {
  return fetch(API_URL + "/resevations").then(handleHttpErrors);
}

export function makeOptions(
  method: string,
  body: object | null,
): RequestInit {
  const opts: RequestInit = {
    method: method,
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
  };
  if (body) {
    opts.body = JSON.stringify(body);
  }
  return opts;
}

export async function handleHttpErrors(res: Response) {
    if (!res.ok) {
        const fullError = await res.json();
        throw { status: res.status, fullError };
    }
  if (res.status === 204) {
    return {};
  }

  return res.json();
}


export { getReservations };