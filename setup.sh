# limits
sysctl -w fs.file-max=12000500
sysctl -w fs.nr_open=20000500
ulimit -n 8000000
sysctl -w net.ipv4.tcp_mem='10000000 10000000 10000000'
sysctl -w net.ipv4.tcp_rmem='1024 4096 16384'
sysctl -w net.ipv4.tcp_wmem='1024 4096 16384'
sysctl -w net.core.rmem_max=16384
sysctl -w net.core.wmem_max=16384
echo "root soft nofile 4000000" >> /etc/security/limits.conf
echo "root hard nofile 4000000" >> /etc/security/limits.conf

# tools
sudo apt-get update
sudo apt-get install mosh -y

# emacs
apt-get install python-minimal -y
git clone git@github.com:chrismccord/dot_emacs.git ~/.emacs.d
curl -fsSL https://raw.githubusercontent.com/cask/cask/master/go | python
cd ~/.emacs.d
~/.cask/bin/cask install

# elixir
# wget https://packages.erlang-solutions.com/erlang-solutions_1.0_all.deb && sudo dpkg -i erlang-solutions_1.0_all.deb
# sudo apt-get install esl-erlang -y
curl -O https://raw.githubusercontent.com/kerl/kerl/master/kerl
chmod a+x kerl
mv kerl /usr/local/bin/
kerl build 18.3 18
kerl list builds
kerl install 18 /usr/share/erlang/18
. /usr/share/erlang/18/activate
sudo apt-get install elixir -y
mix local.rebar --force
mix loca.hex --force

# tsung
wget http://tsung.erlang-projects.org/dist/tsung-1.6.0.tar.gz
tar -xvf tsung-1.6.0.tar.gz
cd tsung-1.6.0/
./configure
make
sudo make install
cd ..

# node
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install nodejs -y

# ruby
gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
curl -L https://get.rvm.io | bash -s stable --ruby
rvm get stable --autolibs=enable
rvm install ruby
rvm --default use ruby-2.3.1
source /usr/local/rvm/scripts/rvm
gem update --system
echo "gem: --no-document" >> ~/.gemrc
rvm gemset use global
gem update
gem install bundler
gem install nokogiri
gem install rails --version=5.0.0
