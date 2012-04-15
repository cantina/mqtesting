#include <czmq.h>
#include <time.h>
#include <stdio.h>

static int n = 8000000;
static int ops = 8000000;

int
main(int argc, const char **argv){
  zctx_t *ctx = zctx_new();
  void *sub = zsocket_new(ctx, ZMQ_SUB);
  zsocket_set_subscribe(sub, "");
  zsocket_connect(sub, "tcp://127.0.0.1:3000");
  printf("connected to :3000\n");

  struct timeval start;
  gettimeofday(&start, NULL);

  while (1) {
    char *msg = zstr_recv(sub);
    if (0 == n--) {
      struct timeval end;
      gettimeofday(&end, NULL);
      int duration = end.tv_sec - start.tv_sec;
      printf("\n");
      printf("  pub/sub:\n");
      printf("    %d msgs\n", ops);
      printf("    %d ops/s\n", ops / duration);
      printf("    %d s\n", duration);
      printf("\n");
      exit(0);
    }
  }

  return 0;
}