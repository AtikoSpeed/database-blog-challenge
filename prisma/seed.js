const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  const createdUsers = await prisma.user.createMany({
    data: [
      {
        username: "atakan",
        email: "atakan@atakan.ninja",
      },
      {
        username: "larry",
        email: "larry@atakan.ninja",
      },
      {
        username: "sergei",
        email: "sergei@atakan.ninja",
      },
    ],
  });

  console.log(`${createdUsers.count} users created`, createdUsers);

  await prisma.profile.createMany({
    data: [
      {
        userId: 1,
        profilePicture: "https://atakan.ninja/images/propic.jpg",
        biography: "Lorem ipsum dolor sit amet",
      },
      {
        userId: 2,
        profilePicture: "https://picsum.photos/200",
        biography: "Lorem ipsum dolor sit amet",
      },
      {
        userId: 3,
        profilePicture: "https://picsum.photos/200",
        biography: "Lorem ipsum dolor sit amet",
      },
    ],
  });

  await prisma.post.createMany({
    data: [
      {
        userId: 1,
        title: "How to kiss a duck",
        content: "To kiss a duck you have to lorem ipsum dolor",
        isPublished: true,
        imageUrl: "https://atakan.ninja/images/propic-full.jpg",
      },
      {
        userId: 1,
        title: "Lorem ipsum dolor",
        content: "This post has no comments",
        isPublished: true,
      },
    ],
  });

  for (let i = 2; i <= createdUsers.count; i++) {
    for (let u = 0; u < 2; u++) {
      await prisma.post.create({
        data: {
          userId: i,
          title: "Lorem ipsum dolor",
          content: "Dolorem ipsum this time",
          isPublished: true,
        },
      });
    }
  }

  await prisma.comment.createMany({
    data: [
      {
        userId: 2,
        postId: 1,
        content: "Lorem ipsum",
      },
      {
        userId: 1,
        commentId: 1,
        content: "Bruh",
      },
      {
        userId: 1,
        postId: 3,
        content: "Lorem ipsum",
      },
      {
        userId: 3,
        postId: 5,
        content: "Lorem ipsum",
      },
    ],
  });

  // Don't edit any of the code below this line
  process.exit(0);
}

seed().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});
