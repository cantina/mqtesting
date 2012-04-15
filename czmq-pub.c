#include <czmq.h>
#include <stdio.h>

int
main(int argc, const char **argv){
  zctx_t *ctx = zctx_new();
  void *sock = zsocket_new(ctx, ZMQ_PUB);
  zsocket_bind(sock, "tcp://127.0.0.1:3000");
  printf("bound to :3000\n");
  while (1) {
    zstr_send(sock, "hello");
    zstr_send(sock, "hello");
    zstr_send(sock, "hello");
    zstr_send(sock, "hello");
    zstr_send(sock, "hello");
    zstr_send(sock, "hello");
    zstr_send(sock, "hello");
    zstr_send(sock, "hello");
    zstr_send(sock, "hello");
  }
  return 0;
}