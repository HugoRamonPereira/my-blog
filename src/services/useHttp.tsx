'use client';

import { useAuth } from '@/contexts/auth';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

type Payload = Record<string, string | number | boolean>

interface SendHttpRequestProps {
  body?: Payload;
  params?: Payload;
  pathParams?: string;
  method: Method.GET | Method.POST | Method.PUT | Method.DELETE;
}

interface ErrorResponse {
  message: string
}

interface UseHttpProps {
  url: string;
}

type AuthorizationHeaderProps = Partial<{ Authorization: string }>;

enum Method { GET = 'GET', POST = 'POST', PUT = 'PUT', DELETE = 'DELETE' }

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

function useHttp<T>({ url }: UseHttpProps) {
	const [responseRequest, setResponseRequest] = useState<T | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const { session } = useAuth();

	function makeParams({params}:Pick<SendHttpRequestProps,'params'>){
		if(!params) return '';

		return Object.keys(params).reduce(function(acc, key, index){
			const value = params[key];
			if (index === 0){
				return `${acc}${key}=${value}`;
			}
			return `${acc}&${key}=${value}`;
		},'?');
	}

	function handleAuthorization(): AuthorizationHeaderProps {
		try {
			const accessToken: string = session.access_token as string;
			if (!!session && !!session.access_token) {
				return { Authorization: `Bearer ${accessToken}` };
			}
			return {};
		} catch (error) {
			toast.error('Authorization denied');
			return {};
		}
	}

	async function sendHttpRequest({ body, method, pathParams, params }: SendHttpRequestProps){
		try {
			setIsLoading(true);
			setResponseRequest(null);
			const requestBody = body ? {body: JSON.stringify(body)} : {};

			const response = await fetch(`${baseUrl}/${url}${pathParams? `/${pathParams}` : ''}${makeParams({params})}`,{
				method: method,
				...requestBody,
				headers: {
					'Content-Type': 'application/json',
					...handleAuthorization()
				}
			});

			if(!response.ok) {
				const responseJson = await response.json();
				throw new Error(responseJson.message ||  responseJson.error);
			}

			const responseJson = await response.json();

			setResponseRequest(responseJson);
			return responseJson;

		} catch(error) {
			toast.error((error as ErrorResponse).message);
			setResponseRequest(null);
			return null;
		}
		finally {
			setIsLoading(false);
		}
	}

	async function Get({ params, pathParams }: Pick<SendHttpRequestProps, 'params' | 'pathParams'>){
		const response = await sendHttpRequest({
			method: Method.GET,
			params,
			pathParams
		});

		return response;
	}

	async function Post({ body }: Pick<SendHttpRequestProps, 'body'>){
		const response = await sendHttpRequest({
			method: Method.POST,
			body
		});

		return response;
	}

	// Put needs a pathParams and a body
	// pathParams id of the post is gonna be altered
	// body - pass the content to be altered
	async function Put({ body, pathParams }: Pick<SendHttpRequestProps, 'body' | 'pathParams'>){
		const response =  await sendHttpRequest({
			method: Method.PUT,
			body,
			pathParams,
		});

		return response;
	}

	// Delete needs only pathParams which contains the id of the post to be deleted
	async function Delete({ pathParams }: Pick<SendHttpRequestProps, 'pathParams'>){
		const response = await sendHttpRequest({
			method: Method.DELETE,
			pathParams
		});

		return response;
	}

	return {responseRequest, isLoading, Get, Post, Put, Delete};
}

export default useHttp;