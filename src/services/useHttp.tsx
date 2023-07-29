'use client';

import { useState } from 'react';

type Payload = Record<string, string | number | boolean>

interface SendHttpRequestProps {
  body?: Payload;
  params?: Payload;
  pathParams?: string;
  method: Method.GET | Method.POST | Method.PUT | Method.DELETE;
}

interface UseHttpProps {
  url: string;
}

enum Method { GET = 'GET', POST = 'POST', PUT = 'PUT', DELETE = 'DELETE' }

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

function useHttp<T>({ url }: UseHttpProps) {
	const [responseRequest, setResponseRequest] = useState<T | null>(null);

	function makeParams({params}:Pick<SendHttpRequestProps,'params'>){
		if(!params) return '';

		return Object.keys(params).reduce(function(acc,key,index){
			const value = params[key];
			if(index ===0){
				return `${acc}${key}=${value}`;
			}
			return `${acc}&${key}=${value}`;
		},'?');
	}

	async function sendHttpRequest({ body, method, pathParams, params }: SendHttpRequestProps){
		try {
			const requestBody = body ? {body: JSON.stringify(body)} : {};

			const response = await fetch(`${baseUrl}/${url}${pathParams? `/${pathParams}` : ''}${makeParams({params})}`,{
				method: method,
				...requestBody,
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json; charset=utf8',
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Credentials': 'true',
					'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE', 'Access-Control-Allow-Headers': 'Content-Type'
				}
			});

			if(!response.ok) {
				throw new Error('Something went wrong');
			}

			const responseJson = await response.json();

			setResponseRequest(responseJson);
		} catch(error: {message: string}) {
			console.log('error:', error);

			setResponseRequest(null);
		}


		// fetch(`${baseUrl}/${url}${pathParams? `/${pathParams}` :''}${makeParams({params})}`, {
		// 	method: method,
		// 	...requestBody,
		// 	headers: {'Content-Type': 'application/json; charset=utf-8' }
		// })
		// 	.then((response) => {
		// 		if (!response.ok) {
		// 			throw new Error('Something went wrong!');
		// 		}
		// 		return response.json();
		// 	})
		// 	.then((response) => {
		// 		setResponseRequest(response);
		// 	})
		// 	.catch((error) => {
		// 		errorRef.current = error.message;
		// 		setResponseRequest(null);
		// 	});
	}

	async function Get({ params,pathParams }: Pick<SendHttpRequestProps,'params'|'pathParams'>){
		await sendHttpRequest({
			method: Method.GET,
			params,
			pathParams
		});
	}

	async function Post({ body }: Pick<SendHttpRequestProps, 'body'>){
		await sendHttpRequest({
			method: Method.POST,
			body
		});
	}

	// Put needs a pathParams and a body
	// pathParams id of the post is gonna be altered
	// body - pass the content to be altered
	async function Put(){}

	// Delete needs only pathParams which contains the id of the post to be deleted
	async function Delete(){}

	return {responseRequest, sendHttpRequest, Get, Post, Put, Delete};
}

export default useHttp;