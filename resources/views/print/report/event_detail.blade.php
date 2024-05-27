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
    <div className="w-full">
        <table>
            <tbody>
                <tr>
                    <td className="font-bold py-2">
                        Tanggal Awal
                    </td>
                    <td className="px-10">:</td>
                    <td>
                        {{ $event->start_date }}
                    </td>
                </tr>
                <tr>
                    <td className="font-bold py-2">
                        Tanggal Awal
                    </td>
                    <td className="px-10">:</td>
                    <td>
                        {{ $event->end_date }}
                    </td>
                </tr>
                <tr>
                    <td className="font-bold py-2">
                        Nama Kegiatan
                    </td>
                    <td className="px-10">:</td>
                    <td>{{ $event->name }}</td>
                </tr>
                <tr>
                    <td className="font-bold py-2">
                        Tempat
                    </td>
                    <td className="px-10">:</td>
                    <td>{{ $event->place }}</td>
                </tr>
                <tr>
                    <td className="font-bold py-2">
                        Jumlah Peserta
                    </td>
                    <td className="px-10">:</td>
                    <td>{{ $event->participant_count}}</td>
                </tr>
                <tr>
                    <td className="font-bold py-2">
                        Lembaga
                    </td>
                    <td className="px-10">:</td>
                    <td>
                        {{ $event->client->company_name }}
                    </td>
                </tr>
                <tr>
                    <td className="font-bold py-2">
                        Pendapatan
                    </td>
                    <td className="px-10">:</td>
                    <td>
                        {{ format_idr($event->finance->income) }}
                    </td>
                </tr>
                <tr>
                    <td className="font-bold py-2">
                        Pengeluaran
                    </td>
                    <td className="px-10">:</td>
                    <td>
                        {{ format_idr($event->finance->expense) }}
                    </td>
                </tr>
                <tr>
                    <td className="font-bold py-2">
                        Laba
                    </td>
                    <td className="px-10">:</td>
                    <td>
                        {{ format_idr($event->finance->profit) }}
                    </td>
                </tr>
                <tr>
                    <td className="font-bold py-2">
                        Status Laporan
                    </td>
                    <td className="px-10">:</td>
                    <td>{{ $event->report->status_text}}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div className="overflow-x-auto w-full" style="margin-top: 50px;">
        <div className="font-bold">Pemateri</div>
        <table className="table" border=1 style="width: 100%;">
            <thead>
                <tr>
                    <th>Tanggal</th>
                    <th>Pemateri</th>
                    <th>Judul</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($event->speakers as $speaker)
                <tr>
                    <td>
                        {{ $speaker->sdate }}
                    </td>
                    <td>
                        {{ $speaker->speaker->name }}
                    </td>
                    <td>
                        {{ $speaker->title }}
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>
    <div className="overflow-x-auto w-full" style="margin-top: 20px;">
        <div className="font-bold">Panitia</div>
        <table className="table" border=1 style="width: 100%;">
            <thead>
                <tr>
                    <th>Panitia</th>
                    <th>Tugas</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($event->committes as $committe)
                <tr>
                    <td>{{ $committe->committe->name}}</td>
                    <td>{{ $committe->task->name }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>
    <div className="overflow-x-auto w-full" style="margin-top: 20px;">
        <div className="font-bold">Fasilitas</div>
        <table className="table" border=1 style="width: 100%;">
            <thead>
                <tr>
                    <th>Fasilitas</th>
                    <th>Jumlah digunakan</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($event->logistics as $logistic)
                <tr>
                    <td>{{ $logistic->logistic->name }}</td>
                    <td>{{ $logistic->qty_used }}</td>
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