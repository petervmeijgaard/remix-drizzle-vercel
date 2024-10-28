import { json, type MetaFunction } from "@vercel/remix";
import { db } from "~/db";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => [
	{ title: "Remix | New Remix App" },
];

export async function loader() {
	const users = await db.query.usersTable.findMany();

	return json({ users });
}

export default function Index() {
	const { users } = useLoaderData<typeof loader>();

	return (
		<div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
			<h1>Welcome to Remix</h1>
			{!!users.length && (
				<ul>
					{users.map(({ name, id }) => (
						<li key={id}>{name}</li>
					))}
				</ul>
			)}
		</div>
	);
}
