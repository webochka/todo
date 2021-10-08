// Config
import { root, user } from './config';

export const api = Object.freeze({
    todo: {
        fetch: () => {
            return fetch(`${root}/todos`, {
                method: 'GET',
                headers: {
                    'x-user': user
                }
            })
        },
        remove: (hash) => {
            return fetch(`${root}/todos/${hash}`, {
                method: 'DELETE',
                headers: {
                    'x-user': user
                }
            })
        },
        create: (payload) => {
            return fetch(`${root}/todos`, {
                method: 'POST',
                headers: {
                    'x-user': user,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
            });
        },
        update: (id, payload) => {
            return fetch(`${root}/todos/${id}`, {
                method: 'PUT',
                headers: {
                    'x-user': user,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
            });
        }
    },
});
