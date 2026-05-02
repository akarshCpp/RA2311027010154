import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') || 10;
    const page = searchParams.get('page') || 1;
    const notification_type = searchParams.get('notification_type');

    let url = `${process.env.NEXT_PUBLIC_API_URL}/notifications?limit=${limit}&page=${page}`;
    if (notification_type && notification_type !== 'All') {
        url += `&notification_type=${notification_type}`;
    }

    try {
        const res = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${process.env.ACCESS_TOKEN}`
            }
        });
        
        if (!res.ok) {
            return NextResponse.json({ error: await res.text() }, { status: res.status });
        }
        const data = await res.json();
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
