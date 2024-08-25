const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  //   const createdUsers = await prisma.user.createMany({
  //     data: [{ username: "alicemartin" }, { username: "alicemartin" }],
  //   });

  //   console.log(`${createdUsers.count} users created`, createdUsers);

  // Add your code here

  await prisma.user.create({
    data: {
      username: "atakan",
      email: "atakan@atakan.ninja",
    },
  });

  await prisma.profile.create({
    data: {
      userId: 1,
      profilePicture: "https://atakan.ninja/images/propic.jpg",
      biography: "Lorem ipsum dolor sit amet",
    },
  });

  await prisma.post.create({
    data: {
      userId: 1,
      title: "How to kiss a duck",
      content: "To kiss a duck you have to lorem ipsum dolor",
      isPublished: true,
      imageUrl: "https://atakan.ninja/images/propic-full.jpg",
    },
  });

  await prisma.comment.createMany({
    data: [
      {
        userId: 1,
        postId: 1,
        content: "Lorem ipsum",
      },
      {
        userId: 1,
        commentId: 1,
        content: "Bruh",
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
