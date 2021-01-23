
#include <linux/kernel.h>
#include <linux/sched.h>
#include <linux/fs.h>
#include <linux/errno.h>
#include <linux/malloc.h>
#include <linux/module.h>
#include <linux/blkdev.h>

// Niezbedne do poprawngo wlaczenia blk.h
#define MAJOR_NR 50
#define DEVICE_NAME "simpleblk"
#define DEVICE_OFF(d)
#include <linux/blk.h>


static char *buffer;
// size rozmiar w MB, mozna zmienic ladujac modul
int size=1;
int nblocks;

int simple_open(struct inode *inode,struct file *file) 
{	
	MOD_INC_USE_COUNT;
	return 0;	
}

void simple_release(struct inode *inode,struct file *file) 
{
	MOD_DEC_USE_COUNT;
}



struct file_operations simple_ops = {
	read: block_read, write:block_write,
	open:simple_open, release:simple_release};


#define SECTORSIZE 512

void simple_request() {
	char *start;
	int bytes;
	
// Petla nieskonczona - bo INIT_REQUEST zawiera return
	while (1) {
		INIT_REQUEST;	
		start=buffer+CURRENT->sector*SECTORSIZE;
		bytes=CURRENT->current_nr_sectors*SECTORSIZE;
		if (CURRENT->sector*SECTORSIZE+bytes > size) {
			printk(DEVICE_NAME ": buffer overrun\n");
			end_request(0);
		} else {
			if (CURRENT->cmd==WRITE) {
				memcpy(start,CURRENT->buffer,bytes);
			} else if (CURRENT->cmd==READ) {
				memcpy(CURRENT->buffer,start,bytes);
			} else 
				panic(DEVICE_NAME ": unknown command");
			CURRENT->nr_sectors-=CURRENT->current_nr_sectors;
			end_request(1);
		}
	}			
}

int init_module() 
{
	size*=(1024*1024);
	buffer=vmalloc(size);
	if (buffer==NULL) {
		printk(DEVICE_NAME ": Buffer allocation failed\n");
		return -1;
	}
	if (register_blkdev(MAJOR_NR,DEVICE_NAME,&simple_ops)<0) {
		printk(DEVICE_NAME ": Device registration failed\n");
		vfree(buffer);
		return -1;
	}
	nblocks=size/1024;
	blk_size[MAJOR_NR]=&nblocks;
        blk_dev[MAJOR_NR].request_fn=simple_request;
        printk(DEVICE_NAME ": Initialization successful\n");
        printk(DEVICE_NAME ": %d blocks\n",nblocks);
	return 0;
}

void cleanup_module() {
	vfree(buffer);
	unregister_blkdev(MAJOR_NR,"simpleblk");
}
