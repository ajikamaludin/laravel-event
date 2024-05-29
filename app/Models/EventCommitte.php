<?php

namespace App\Models;

class EventCommitte extends Model
{
    protected $fillable = [
        'event_id',
        'committe_id',
        'task_id',
    ];

    public function tasks()
    {
        return $this->hasMany(EventCommitteTask::class, 'ec_id');
    }

    public function task()
    {
        return $this->belongsTo(CommitteTask::class, 'task_id');
    }

    public function committe()
    {
        return $this->belongsTo(Committe::class, 'committe_id')->withTrashed();
    }

    public function event()
    {
        return $this->belongsTo(Event::class, 'event_id')->withTrashed();
    }
}
