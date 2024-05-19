<?php

namespace App\Console\Commands;

use App\Services\ZipServices;
use Illuminate\Console\Command;
use RuntimeException;
use Symfony\Component\Process\Process;

use function Laravel\Prompts\confirm;

class BuildArchiveCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:compress {--r|remove=n}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Compress to zip this application to be ready to deploy on hosting panel';

    /**
     * Configure the command.
     */
    protected function configure()
    {
        $this->setAliases(['compress', 'build', 'b']);

        parent::configure();
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $zipName = basename(base_path()).'.zip';
        if ($this->option('remove') != 'n') {
            try {
                unlink(base_path($zipName));
            } finally {
                $this->info('Compressed file removed');

                return;
            }
        }

        $this->runShellCommands(['php artisan optimize:clear']);

        $runNpmBuild = confirm('build new assets ?', true);
        if ($runNpmBuild) {
            $this->info('Building new assets files');
            $this->runShellCommands(['npm run build']);
        }

        $r = new ZipServices;

        $withRawJs = confirm('Includes resources/js ?', false);
        if (! $withRawJs) {
            $r->addExcludedPath('resources/js');
        }

        $r->create(base_path(), $zipName);

        if ($r) {
            $this->info('Successfuly create compressed zip file');

            return;
        }
        $this->error('Error');
    }

    /**
     * Run the given commands.
     *
     * @param  array  $commands
     * @return void
     */
    protected function runShellCommands($commands)
    {
        $process = Process::fromShellCommandline(implode(' && ', $commands), null, null, null, null);

        if ('\\' !== DIRECTORY_SEPARATOR && file_exists('/dev/tty') && is_readable('/dev/tty')) {
            try {
                $process->setTty(true);
            } catch (RuntimeException $e) {
                $this->output->writeln('  <bg=yellow;fg=black> WARN </> '.$e->getMessage().PHP_EOL);
            }
        }

        $process->run(function ($type, $line) {
            $this->output->write('    '.$line);
        });
    }
}
