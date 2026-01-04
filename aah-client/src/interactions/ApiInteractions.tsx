//import type { ErrorType } from './ErrorType.js';
import type { UserType } from './UserType.js';

export async function fetchUsers(): Promise<UserType[] | number> {
    const response: Response = await fetch('/api/users');
    if (!response.ok) {
        return response.status;
    }
    const data: UserType[] = await response.json();
    return data;
}

export async function fetchUserById(userId: number): Promise<UserType | number> {
    const response: Response = await fetch(`/api/users/${userId}`);
    if (!response.ok) {
        return response.status;
    }
    const data: UserType = await response.json();
    return data;
}

export async function updateUser(email: string, id: number): Promise<UserType | number> {
    const response: Response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ email: email }).toString(),
    });

    if (!response.ok) {
        return response.status;
    }
    const data: UserType = await response.json();
    return data;
}

export async function insertUser(name: string, email: string): Promise<UserType | number> {
    const response: Response = await fetch(`/api/users/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ name: name, email: email }).toString(),
    });

    if (!response.ok) {
        return response.status;
    }
    const data: UserType = await response.json();
    return data;
}

export async function deleteUser(userId: number): Promise<UserType | number> {
    const response: Response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        return response.status;
    }
    const data: UserType = await response.json();
    return data;
}