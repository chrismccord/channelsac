## Setting up the servers

As root, run the following on both the tsung client server and phoenix/rails server:

    $ ./setup.sh


## Setting up Phoenix

```console
$ cd chat/
$ mix deps.get
$ MIX_ENV=prod mix compile
$ MIX_ENV=prod PORT=4000 mix phoenix.server
```

## Setting up Rails

```console
$ cd rails/
$ bundle
$ bundle exec puma -e production -w 8
```


## Running Benchmarks

To vary the number of rooms, users per room, and connections, you'll need to modify `rails.xml`, `phoenix.xml`, as well as `rails/app/channels/rooms_channel.rb`.

From the tsung client, to bench rails:

    $ ./bench_rails.sh


From the tsung client, to bench phoenix:

    $ ./bench_rails.sh
