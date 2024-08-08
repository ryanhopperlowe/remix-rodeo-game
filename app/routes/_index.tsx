import type { ActionFunctionArgs, MetaFunction } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';

export const meta: MetaFunction = () => {
    return [{ title: 'Re-Wordle' }, { name: 'description', content: 'Welcome to Remix!' }];
};

export async function loader() {
    return {
        attempts: [[], [], [], [], [], []]
    };
}

export async function action({ request }: ActionFunctionArgs) {
    const formData = Object.fromEntries(await request.formData());

    console.log({ formData });
    return {
        attempts: [[], [], [], [], [], []]
    };
}

const colorMap = {
    0: 'black',
    1: 'green',
    2: 'yellow'
};

export default function Index() {
    const { word } = useLoaderData<typeof loader>();
    return (
        <div className="font-sans p-4">
            <Form>
                <ul className="list-disc mt-4 pl-6 space-y-2">
                    {word.map((letter, idx) => (
                        <input key={`letter-${idx}`} name={idx.toString()} />
                    ))}
                </ul>
            </Form>
        </div>
    );
}
