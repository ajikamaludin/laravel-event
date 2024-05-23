<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Print</title>
    <style>
        table {
            border-collapse: collapse;
        }
    </style>
</head>

<body>
    <div className="w-full flex flex-row gap-6" style="width: 100%;display: flex;flex-direction: row;gap: 1.5rem">
        <div className="w-1/2" style="width: 50%;">
            <table>
                <tbody>
                    <tr>
                        <td className="font-bold py-2">
                            ID
                        </td>
                        <td className="px-10">:</td>
                        <td>{{$participant->code}}</td>
                    </tr>
                    <tr>
                        <td className="font-bold py-2">
                            Nama
                        </td>
                        <td className="px-10">:</td>
                        <td>{{$participant->name}}</td>
                    </tr>
                    <tr>
                        <td className="font-bold py-2">
                            Email
                        </td>
                        <td className="px-10">:</td>
                        <td>{{$participant->email}}</td>
                    </tr>
                    <tr>
                        <td className="font-bold py-2">
                            No.Telp
                        </td>
                        <td className="px-10">:</td>
                        <td>{{$participant->phone}}</td>
                    </tr>
                    <tr>
                        <td className="font-bold py-2">
                            Alamat
                        </td>
                        <td className="px-10">:</td>
                        <td>{{$participant->address}}</td>
                    </tr>
                    <tr>
                        <td className="font-bold py-2">
                            Kota
                        </td>
                        <td className="px-10">:</td>
                        <td>{{$participant->city}}</td>
                    </tr>
                    <tr>
                        <td className="font-bold py-2">
                            Tanggal Lahir
                        </td>
                        <td className="px-10">:</td>
                        <td>{{$participant->dob}}</td>
                    </tr>
                    <tr>
                        <td className="font-bold py-2">
                            Jenis Kelamin
                        </td>
                        <td className="px-10">:</td>
                        <td>{{$participant->gender}}</td>
                    </tr>
                    <tr>
                        <td className="font-bold py-2">
                            Lembaga
                        </td>
                        <td className="px-10">:</td>
                        <td>
                            {{ $participant->client->company_name }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            @if($participant->photo !== null)
            <img src="{{$participant->photo_url}}" style="width: 12rem;" />
            @endif
        </div>
    </div>
    <div className="overflow-x-auto">
        <table className="table" border=1 style="width: 100%; margin-top: 50px;">
            <thead>
                <tr>
                    <th>Tanggal Awal</th>
                    <th>Tanggal Akhir</th>
                    <th>Nama Kegiatan</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($participant->events as $event)
                <tr>
                    <td>
                        {{$event->event->start_date}}
                    </td>
                    <td>
                        {{$event->event->end_date}}
                    </td>
                    <td>{{$event->event->name}}</td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</body>
<script>
    window.print()
    window.onfocus = function() {
        window.close();
    }
</script>

</html>